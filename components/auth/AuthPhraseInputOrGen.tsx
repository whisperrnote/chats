'use client';
import { Typography, TextField, Button, ToggleButtonGroup, ToggleButton, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { useAuthFlow } from '@/store/authFlow';
import { generateRecoveryPhrase, deriveEncryptionKey } from '@/lib/phrase';
import {
  signupEmailPassword,
  loginEmailPassword,
  findUserByUsername,
  createUserProfile,
  usernameToEmail,
} from '@/lib/appwrite';
import { useState } from 'react';

export default function AuthPhraseInputOrGen() {
  const {
    usernameExists,
    username,
    phraseType, setPhraseType,
    phrase, setPhrase,
    setStep,
    error, setError
  } = useAuthFlow() as {
    usernameExists: boolean;
    username: string;
    phraseType: 12 | 24 | null;
    setPhraseType: (val: 12 | 24 | null) => void;
    phrase: string;
    setPhrase: (val: string) => void;
    setStep: (val: string) => void;
    error: string;
    setError: (val: string) => void;
  };

  const [loading, setLoading] = useState(false);

  // Helper: derive public/private keypair and encrypt private key (stub for now)
  async function generateKeysAndEncrypt(phrase: string, username: string) {
    // In production, use libsodium or similar for keypair generation
    // Here, just use the encryption key as both public and encrypted private key for demo
    const encryptionKey = await deriveEncryptionKey(phrase, username);
    return {
      publicKey: encryptionKey,
      encryptedPrivateKey: encryptionKey,
    };
  }

  // Signup: create Appwrite account, then user profile in DB
  const handleSignup = async () => {
    setLoading(true);
    setError('');
    try {
      // Check if username already exists
      const user = await findUserByUsername(username);
      if (user) {
        setError('Username already exists. Please choose another.');
        setLoading(false);
        return;
      }
      // Create Appwrite account and session
      const email = usernameToEmail(username);
      const session = await signupEmailPassword(email, phrase, username);
      // Generate keys and encrypt private key
      const { publicKey, encryptedPrivateKey } = await generateKeysAndEncrypt(phrase, username);
      // Create user profile in DB
      await createUserProfile({
        userId: session.userId || session.user.$id,
        username,
        displayName: username,
        email,
        publicKey,
        encryptedPrivateKey,
      });
      setStep('done');
    } catch (e: any) {
      setError('Failed to create account. Username may be taken or phrase invalid.');
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
      await loginEmailPassword(usernameToEmail(username), phrase);
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
  );
}