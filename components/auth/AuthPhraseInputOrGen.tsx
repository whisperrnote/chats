'use client';

import { motion } from 'framer-motion';
import {
  Button,
  CircularProgress,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Box,
} from '@mui/material';
import {
  canonizeUsername,
  createUserProfile,
  findUserByUsername,
  ID,
  loginEmailPassword,
  signupEmailPassword,
  usernameToEmail,
} from '@/lib/appwrite';
import {
  deriveEncryptionKey,
  derivePasswordFromPhrase,
  generateRecoveryPhrase,
} from '@/lib/phrase';
import { useAuthFlow } from '@/store/authFlow';
import { useSnackbar } from '@/components/providers/SnackbarProvider';

export default function AuthPhraseInputOrGen() {
  const snackbar = require('@/components/providers/SnackbarProvider').useSnackbar();
  // Use auth flow store for all state
  const {
    username, setUsername,
    phrase, setPhrase,
    phraseType, setPhraseType,
    usernameExists, setUsernameExists,
    error, setError,
    step, setStep,
    loading, setLoading
  } = useAuthFlow();

  // Helper to stringify any error
  function stringifyError(err: any): string {
    if (!err) return 'Unknown error';
    if (typeof err === 'string') return err;
    if (err.message) return `${err.message}${err.code ? ` (code: ${err.code})` : ''}${err.type ? ` [${err.type}]` : ''}`;
    try {
      return JSON.stringify(err);
    } catch {
      return String(err);
    }
  }

  // Signup: create Appwrite account, then user profile in DB
  const handleSignup = async () => {
    setLoading(true);
    setError('');
    try {
      // Check if username already exists
      const existingUser = await findUserByUsername(username);
      if (existingUser) {
        setError('Username already exists. Please choose another.');
        setLoading(false);
        return;
      }
      // Generate unique user ID
      const userId = ID.unique();
      // Use username-based email
      const email = usernameToEmail(username);
      // Derive a strong password from phrase for Appwrite
      const derivedPassword = derivePasswordFromPhrase(phrase, username);
      // Create Appwrite account and session
      const { session, account: createdAccount } = await signupEmailPassword(email, derivedPassword, username, userId);
      // Derive encryption key from mnemonic
      const encryptionKey = await deriveEncryptionKey(phrase, canonizeUsername(username) || username);
      // Store encryption key in session state
      const { useEncryption } = require('@/store/encryption');
      useEncryption.getState().setEncryptionKey(encryptionKey);
      // For now, just use the encryptionKey as both publicKey and encryptedPrivateKey (stub)
      const { publicKey, encryptedPrivateKey } = {
        publicKey: encryptionKey,
        encryptedPrivateKey: encryptionKey,
      };
      // Create user profile in database
      await createUserProfile({
        userId,
        username,
        displayName: username,
        email,
        publicKey,
        encryptedPrivateKey,
      });
      setStep('done');
    } catch (err: any) {
      setError(`Failed to create account: ${stringifyError(err)}`);
    } finally {
      setLoading(false);
    }
  };

  // Login: create session
  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const user = await findUserByUsername(username);
      if (!user) {
        setError('Username does not exist.');
        setLoading(false);
        return;
      }
      const email = usernameToEmail(username);
      const derivedPassword = derivePasswordFromPhrase(phrase, username);
      await loginEmailPassword(email, derivedPassword);
      // Derive encryption key and store in session (for message decryption)
      const encryptionKey = await deriveEncryptionKey(phrase, canonizeUsername(username) || username);
      const { useEncryption } = require('@/store/encryption');
      useEncryption.getState().setEncryptionKey(encryptionKey);
      setStep('done');
    } catch (e: any) {
      setError('Invalid recovery phrase or account.');
    } finally {
      setLoading(false);
    }
  };

  const handlePhraseTypeChange = (_: React.MouseEvent<HTMLElement>, value: number | null) => {
    if (value === 12 || value === 24) {
      setPhraseType(value);
    } else {
      setPhraseType(null);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {usernameExists ? (
        <>
          <Typography variant="h6" mb={2}>Enter your recovery phrase</Typography>
          <TextField
            label="Recovery Phrase"
            value={phrase}
            onChange={e => setPhrase(e.target.value)}
            fullWidth
            multiline
            sx={{ mb: 2 }}
            placeholder="Enter your 12 or 24 word phrase"
          />
          <Button
            variant="contained"
            onClick={() => { handleLogin(); }}
            disabled={!phrase || loading}
          >
            {loading ? <CircularProgress size={20} /> : 'Login'}
          </Button>
          {error && <Typography color="error">{error}</Typography>}
        </>
      ) : (
        <>
          <Typography variant="h6" mb={2}>Select phrase type</Typography>
          <ToggleButtonGroup
            value={phraseType}
            exclusive
            onChange={handlePhraseTypeChange}
            sx={{ mb: 2 }}
          >
            <ToggleButton value={12}>12 words</ToggleButton>
            <ToggleButton value={24}>24 words</ToggleButton>
          </ToggleButtonGroup>
          <Button
            variant="contained"
            onClick={() => {
              if (phraseType === 12 || phraseType === 24) {
                const newPhrase = generateRecoveryPhrase(phraseType);
                setPhrase(newPhrase);
                setStep('showPhrase');
              }
            }}
            disabled={!phraseType}
          >
            Generate Phrase
          </Button>
          {step === 'showPhrase' && (
            <Box sx={{ mb: 2 }}>
              <Box sx={{ p: 2, bgcolor: '#fff', borderRadius: 2, border: '1px solid #eee', textAlign: 'left' }}>
                <Typography sx={{ color: '#000', fontWeight: 600, fontSize: 18, wordBreak: 'break-word' }}>
                  {phrase}
                </Typography>
              </Box>
              <Button
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
                onClick={() => { navigator.clipboard.writeText(phrase); }}
                fullWidth
              >
                Copy
              </Button>
            </Box>
          )}
          {phrase && (
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => { handleSignup(); }}
              disabled={!phrase || loading}
            >
              {loading ? <CircularProgress size={20} /> : 'Sign Up'}
            </Button>
          )}
          {error && <Typography color="error">{error}</Typography>}
        </>
      )}
    </motion.div>
  );
}
