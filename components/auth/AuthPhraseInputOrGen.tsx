'use client';

import React from 'react';
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
import { generateRecoveryPhrase } from '@/lib/phrase';
import { useAuthFlow } from '@/store/authFlow';
import { useSnackbar } from '@/components/providers/SnackbarProvider';

export default function AuthPhraseInputOrGen() {
  const snackbar = useSnackbar();
  const {
    username, setUsername,
    phrase, setPhrase,
    phraseType, setPhraseType,
    usernameExists,
    error, setError,
    step, setStep,
    loading, setLoading
  } = useAuthFlow();
  const [progress, setProgress] = React.useState<string>('');

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

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const user = await findUserByUsername(username);
      if (!user) {
        setError('Username does not exist.');
        snackbar.show('Username does not exist.', 'error');
        setLoading(false);
        return;
      }
      let password = '';
      if (typeof window !== 'undefined') {
        password = window.prompt('Enter your password for ' + username + ':', '') || '';
      }
      if (!password) {
        setError('Password is required.');
        setLoading(false);
        return;
      }
      const email = usernameToEmail(username);
      await loginEmailPassword(email, password);
      const freshUser = await findUserByUsername(username);
      if (!freshUser || !freshUser.encryptedPrivateKey) {
        setError('User profile missing encrypted username.');
        snackbar.show('User profile missing encrypted username.', 'error');
        setLoading(false);
        return;
      }
      const { verifyPhraseWithEncryptedUsername } = await import('@/lib/e2ee');
      const isValid = await verifyPhraseWithEncryptedUsername(phrase, canonizeUsername(username) || username, freshUser.encryptedPrivateKey);
      if (!isValid) {
        setError('Incorrect recovery phrase.');
        snackbar.show('Incorrect recovery phrase.', 'error');
        setLoading(false);
        return;
      }
      setStep('done');
    } catch (e: any) {
      setError('Login failed: ' + (e?.message || 'Unknown error'));
      snackbar.show('Login failed: ' + (e?.message || 'Unknown error'), 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    setError('');
    setProgress('Checking username availability...');
    try {
      const existingUser = await findUserByUsername(username);
      if (existingUser) {
        setError('Username already exists. Please choose another.');
        snackbar.show('Username already exists. Please choose another.', 'error');
        setLoading(false);
        setProgress('');
        return;
      }
      setProgress('Creating account...');
      const userId = ID.unique();
      const email = usernameToEmail(username);
      let password = '';
      if (typeof window !== 'undefined') {
        password = window.prompt('Set a password for ' + username + ':', '') || '';
      }
      if (!password) {
        setError('Password is required.');
        setLoading(false);
        setProgress('');
        return;
      }
      await signupEmailPassword(email, password, username, userId);
      setProgress('Encrypting recovery phrase...');
      const { createE2EEKeysAndEncryptUsername } = await import('@/lib/e2ee');
      const { encryptedUsername } = await createE2EEKeysAndEncryptUsername(phrase, canonizeUsername(username) || username);
      setProgress('Saving user profile...');
      await createUserProfile({
        userId,
        username,
        displayName: username,
        email,
        publicKey: '', // Not used
        encryptedPrivateKey: encryptedUsername,
        status: 'offline',
      });
      setProgress('Reserving username...');
      try {
        const { createUsernameDoc } = await import('@/lib/appwrite');
        await createUsernameDoc({ username, status: 'active', lastUsedBy: userId });
      } catch (err) {
        snackbar.show('Warning: Could not reserve username. Signup succeeded, but username may not be unique.', 'warning');
      }
      setProgress('Finishing up...');
      setStep('done');
      setProgress('');
    } catch (err: any) {
      const msg = `Failed to create account: ${stringifyError(err)}`;
      setError(msg);
      snackbar.show(msg, 'error');
      setProgress('');
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
    <>
      {loading && (
        <Box sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          bgcolor: 'rgba(255,255,255,0.85)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <CircularProgress size={48} sx={{ mb: 3 }} />
          <Typography variant="h6" sx={{ mb: 1 }}>{progress || 'Setting up your account...'}</Typography>
        </Box>
      )}
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
              onClick={handleLogin}
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
                onClick={handleSignup}
                disabled={!phrase || loading}
              >
                {loading ? <CircularProgress size={20} /> : 'Sign Up'}
              </Button>
            )}
            {error && <Typography color="error">{error}</Typography>}
          </>
        )}
      </motion.div>
    </>
  );
}
