'use client';
import { useEffect, useState } from 'react';
import { Typography, TextField, Button, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { useAuthFlow } from '@/store/authFlow';
import { findUserByUsername } from '@/lib/appwrite';

export default function AuthUsernameInput() {
  const {
    username, setUsername,
    usernameExists, setUsernameExists,
    loading, setLoading,
    step, setStep,
    error, setError
  } = useAuthFlow();

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
      {loading && <CircularProgress size={24} />}
{usernameExists === true && (
          <Typography color="primary" sx={{ mt: 1 }}>Username found. Please enter your password.</Typography>
        )}      {usernameExists === false && (
        <Typography color="secondary" sx={{ mt: 1 }}>Username not found. Create a new account.</Typography>
      )}
      {error && <Typography color="error">{error}</Typography>}
      {usernameExists !== null && (
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => setStep('done')}
          disabled={loading || !username}
        >
          Continue
        </Button>
      )}
    </motion.div>
  );
}
