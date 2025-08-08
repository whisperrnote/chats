'use client';
import { useEffect, useState } from 'react';
import { Typography, TextField, Button, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { useAuthFlow } from '@/store/authFlow';
import { findUserByUsername } from '@/lib/appwrite';

import { loginEmailPassword, usernameToEmail } from '@/lib/appwrite';

export default function AuthUsernameInput() {
  const {
    username, setUsername,
    usernameExists, setUsernameExists,
    loading, setLoading,
    step, setStep,
    error, setError
  } = useAuthFlow();
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  useEffect(() => {
    if (!username) {
      setUsernameExists(null);
      return;
    }
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const user = await findUserByUsername(username);
        setUsernameExists(!!user);
        setError('');
      } catch (e) {
        setError('Error checking username');
      } finally {
        setLoading(false);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [username, setUsernameExists, setLoading, setError]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Typography variant="h5" mb={2}>Enter your username</Typography>
      <TextField
        label="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        fullWidth
        autoFocus
        sx={{ mb: 2 }}
      />
      {usernameExists === true && (
        <>
          <Typography color="primary" sx={{ mt: 1 }}>Username found. Please enter your password.</Typography>
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
            sx={{ mt: 2, mb: 2 }}
          />
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={async () => {
              setLocalError('');
              setLoading(true);
              try {
                await loginEmailPassword(usernameToEmail(username), password);
                setStep('phrase');
              } catch (e: any) {
                setLocalError(e?.message || 'Login failed');
              } finally {
                setLoading(false);
              }
            }}
            disabled={loading || !username || !password}
          >
            Continue
          </Button>
          {localError && <Typography color="error">{localError}</Typography>}
        </>
      )}
      {usernameExists === false && (
        <Typography color="secondary" sx={{ mt: 1 }}>Username not found. Create a new account.</Typography>
      )}
      {error && <Typography color="error">{error}</Typography>}
    </motion.div>
  );
}
