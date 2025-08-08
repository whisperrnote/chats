'use client';
import { useEffect, useState } from 'react';
import { Typography, TextField, Button, CircularProgress } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthFlow } from '@/store/authFlow';
import { findUserByUsername } from '@/lib/appwrite';
import { useRouter } from 'next/navigation';

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

  const router = useRouter();

  const handleContinue = async () => {
    setLocalError('');
    if (usernameExists === false) {
      // Redirect to registration page, passing username and password if desired
      router.push('/auth/register');
      return;
    }
    setLoading(true);
    try {
      await loginEmailPassword(usernameToEmail(username), password);
      setStep('phrase');
    } catch (e: any) {
      setLocalError(e?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

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
      <AnimatePresence>
        {username && (
          <motion.div
            key="password-field"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            {usernameExists === true && (
              <Typography color="primary" sx={{ mt: 1 }}>Username found. Please enter your password.</Typography>
            )}
            {usernameExists === false && (
              <Typography color="secondary" sx={{ mt: 1 }}>Username not found. Create a new account.</Typography>
            )}
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              fullWidth
              sx={{ mt: 2, mb: 2 }}
              autoFocus={!!username}
              onKeyDown={e => {
                if (e.key === 'Enter' && password) {
                  handleContinue();
                }
              }}
            />
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleContinue}
              disabled={loading || !username || !password}
            >
              {usernameExists === false ? 'Create Account' : 'Continue'}
            </Button>
            {localError && <Typography color="error">{localError}</Typography>}
          </motion.div>
        )}
      </AnimatePresence>
      {error && <Typography color="error">{error}</Typography>}
    </motion.div>
  );
}
