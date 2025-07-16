'use client';
import { Typography, TextField, Button, ToggleButtonGroup, ToggleButton, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { useAuthFlow } from '@/store/authFlow';
import { generateRecoveryPhrase, verifyRecoveryPhrase } from '@/lib/phrase';
import { loginEmailPassword, signupEmailPassword } from '@/lib/appwrite';
import { useState } from 'react';

export default function AuthPhraseInputOrGen() {
  const {
    usernameExists,
    username,
    phraseType, setPhraseType,
    phrase, setPhrase,
    setStep,
    error, setError
  } = useAuthFlow();

  const [loading, setLoading] = useState(false);

  // Helper to create a pseudo-email from username
  const getEmail = (username: string) => `${username}@whisperrchat.local`;

  // Login handler
  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await loginEmailPassword(getEmail(username), phrase);
      setStep('done');
    } catch (e: any) {
      setError('Invalid recovery phrase or account.');
    } finally {
      setLoading(false);
    }
  };

  // Signup handler
  const handleSignup = async () => {
    setLoading(true);
    setError('');
    try {
      await signupEmailPassword(getEmail(username), phrase, username);
      setStep('done');
    } catch (e: any) {
      setError('Failed to create account. Username may be taken.');
    } finally {
      setLoading(false);
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
            onChange={(_, v) => setPhraseType(v)}
            sx={{ mb: 2 }}
          >
            <ToggleButton value={12}>12 words</ToggleButton>
            <ToggleButton value={24}>24 words</ToggleButton>
          </ToggleButtonGroup>
          <Button
            variant="contained"
            onClick={() => {
              const newPhrase = generateRecoveryPhrase(phraseType);
              setPhrase(newPhrase);
              setStep('showPhrase');
            }}
            disabled={!phraseType}
          >
            Generate Phrase
          </Button>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleSignup}
            disabled={!phrase || loading}
          >
            {loading ? <CircularProgress size={20} /> : 'Sign Up'}
          </Button>
          {error && <Typography color="error">{error}</Typography>}
        </>
      )}
    </motion.div>
  );
}
