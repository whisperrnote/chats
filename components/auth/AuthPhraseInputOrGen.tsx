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
import { generateRecoveryPhrase } from '@/lib/phrase';
import { useAuthFlow } from '@/store/authFlow';
import { useSnackbar } from '@/components/providers/SnackbarProvider';
import { useAuth } from '@/hooks/useAuth';

export default function AuthPhraseInputOrGen() {
  const snackbar = useSnackbar();
  const {
    username,
    phrase,
    setPhrase,
    phraseType,
    setPhraseType,
    usernameExists,
    error,
    setError,
    step,
    setStep,
    loading,
    setLoading,
  } = useAuthFlow();

  const { loginWithPhrase, registerWithPhrase, error: authError } = useAuth();

  React.useEffect(() => {
    if (authError) {
      setError(authError);
      snackbar.show(authError, 'error');
    }
  }, [authError, setError, snackbar]);

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    await loginWithPhrase(username, phrase);
    setLoading(false);
  };

  const handleSignup = async () => {
    setLoading(true);
    setError('');
    await registerWithPhrase(username, phrase);
    setLoading(false);
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
        <Box
          sx={{
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
          }}
        >
          <CircularProgress size={48} sx={{ mb: 3 }} />
          <Typography variant="h6" sx={{ mb: 1 }}>
            Setting up your account...
          </Typography>
        </Box>
      )}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {usernameExists ? (
          <>
            <Typography variant="h6" mb={2}>
              Enter your recovery phrase
            </Typography>
            <TextField
              label="Recovery Phrase"
              value={phrase}
              onChange={(e) => setPhrase(e.target.value)}
              fullWidth
              multiline
              sx={{ mb: 2 }}
              placeholder="Enter your 12 or 24 word phrase"
            />
            <Button variant="contained" onClick={handleLogin} disabled={!phrase || loading}>
              {loading ? <CircularProgress size={20} /> : 'Login'}
            </Button>
            {error && <Typography color="error">{error}</Typography>}
          </>
        ) : (
          <>
            <Typography variant="h6" mb={2}>
              Select phrase type
            </Typography>
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
                <Box
                  sx={{
                    p: 2,
                    bgcolor: '#fff',
                    borderRadius: 2,
                    border: '1px solid #eee',
                    textAlign: 'left',
                  }}
                >
                  <Typography
                    sx={{ color: '#000', fontWeight: 600, fontSize: 18, wordBreak: 'break-word' }}
                  >
                    {phrase}
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ mt: 1 }}
                  onClick={() => {
                    navigator.clipboard.writeText(phrase);
                  }}
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
