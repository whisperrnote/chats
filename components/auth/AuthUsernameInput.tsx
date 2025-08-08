'use client';
import { useState } from 'react';
import { Typography, TextField, Button, Link } from '@mui/material';
import { motion } from 'framer-motion';
import { useAuthFlow } from '@/store/authFlow';
import { useRouter } from 'next/navigation';

import { loginEmailPassword, signupEmailPassword, usernameToEmail } from '@/lib/appwrite';

export default function AuthUsernameInput() {
  const {
    username, setUsername,
    loading, setLoading,
    step, setStep,
    error, setError
  } = useAuthFlow();
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const [intent, setIntent] = useState<'login' | 'signup'>('login');
  const router = useRouter();

  const handleContinue = async () => {
    setLocalError('');
    setLoading(true);
    try {
      if (intent === 'signup') {
        const userId = undefined; // Let Appwrite generate
        await signupEmailPassword(usernameToEmail(username), password, username, userId);
        setStep('phrase');
        return;
      } else {
        await loginEmailPassword(usernameToEmail(username), password);
        setStep('phrase');
        return;
      }
    } catch (e: any) {
      setLocalError(e?.message || (intent === 'signup' ? 'Signup failed' : 'Login failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Typography variant="h5" mb={2}>{intent === 'signup' ? 'Create your account' : 'Sign in to your account'}</Typography>
      <TextField
        label="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        fullWidth
        autoFocus
        sx={{ mb: 2 }}
      />
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
        fullWidth
      >
        {intent === 'signup' ? 'Sign up' : 'Sign in'}
      </Button>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        {intent === 'login' ? (
          <Link component="button" variant="body2" onClick={() => setIntent('signup')}>
            Don&apos;t have an account? Sign up
          </Link>
        ) : (
          <Link component="button" variant="body2" onClick={() => setIntent('login')}>
            Already have an account? Log in
          </Link>
        )}
      </Box>
      {localError && <Typography color="error">{localError}</Typography>}
      {error && <Typography color="error">{error}</Typography>}
    </motion.div>
  );
}
