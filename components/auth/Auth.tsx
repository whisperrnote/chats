'use client';
import React, { useState } from 'react';
import {
  Button,
  CircularProgress,
  TextField,
  Typography,
  Box,
  Tabs,
  Tab,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import { useAuth } from '@/hooks/useAuth';
import { useSnackbar } from '@/components/providers/SnackbarProvider';
import { generateRecoveryPhrase } from '@/lib/phrase';

export default function Auth() {
  const [tab, setTab] = useState(0);
  const [phrase, setPhrase] = useState('');
  const [username, setUsername] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const { authenticateWithPhrase, isLoading, error } = useAuth();
  const snackbar = useSnackbar();

  const handleGeneratePhrase = () => {
    const newPhrase = generateRecoveryPhrase();
    setPhrase(newPhrase);
  };

  const handleContinueWithPhrase = async () => {
    try {
      await authenticateWithPhrase(phrase, isLogin ? username : undefined);
      // On success, the main layout will redirect to /app or /set-username
    } catch (e: any) {
      snackbar.show(e.message || 'An error occurred.', 'error');
    }
  };

  const handleContinueWithPasskey = async () => {
    // To be implemented
    snackbar.show('Passkey authentication is not yet implemented.', 'info');
  };

  return (
    <Box>
      <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} centered>
        <Tab label="Secret Phrase" />
        <Tab label="Passkey" />
      </Tabs>

      {tab === 0 && (
        <Box mt={4}>
          <ToggleButtonGroup
            value={isLogin}
            exclusive
            onChange={() => setIsLogin(!isLogin)}
            fullWidth
            sx={{ mb: 2 }}
          >
            <ToggleButton value={true}>Sign In</ToggleButton>
            <ToggleButton value={false}>Sign Up</ToggleButton>
          </ToggleButtonGroup>

          <Typography variant="h6" mb={2}>
            {isLogin ? 'Sign in to your account' : 'Create a new account'}
          </Typography>

          {isLogin && (
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
              placeholder="Enter your username"
            />
          )}

          <TextField
            label="Your 12 or 24-word secret phrase"
            value={phrase}
            onChange={(e) => setPhrase(e.target.value)}
            fullWidth
            multiline
            rows={3}
            placeholder={isLogin ? "Enter your secret phrase" : "Leave empty to generate a new one"}
          />

          {!isLogin && (
            <Button
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleGeneratePhrase}
            >
              Generate a new phrase
            </Button>
          )}

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleContinueWithPhrase}
            disabled={isLoading || !phrase || (isLogin && !username)}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Continue'}
          </Button>
        </Box>
      )}

      {tab === 1 && (
        <Box mt={4} textAlign="center">
          <Typography variant="h6" mb={2}>
            Sign in with a passkey
          </Typography>
          <Typography variant="body1" mb={3}>
            Use your device's biometrics or a hardware key to sign in securely without a password.
          </Typography>
          <Button
            variant="contained"
            onClick={handleContinueWithPasskey}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Continue with Passkey'}
          </Button>
        </Box>
      )}

      {error && (
        <Typography color="error" mt={2}>
          {error}
        </Typography>
      )}
    </Box>
  );
}
