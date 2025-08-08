'use client';
import { useEffect, useState } from 'react';
import { Typography, TextField, Button, CircularProgress } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthFlow } from '@/store/authFlow';
import { findUserByUsername } from '@/lib/appwrite';
import { useRouter } from 'next/navigation';

import { loginEmailPassword, signupEmailPassword, usernameToEmail } from '@/lib/appwrite';

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
   const [showPasswordField, setShowPasswordField] = useState(false);
   const [pauseTimer, setPauseTimer] = useState<NodeJS.Timeout | null>(null);

   useEffect(() => {
     setShowPasswordField(false);
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
     return () => {
       clearTimeout(timer);
       if (pauseTimer) clearTimeout(pauseTimer);
     };
   }, [username, setUsernameExists, setLoading, setError]);

   useEffect(() => {
     if (loading || usernameExists === null) {
       setShowPasswordField(false);
       return;
     }
     if (pauseTimer) clearTimeout(pauseTimer);
     const t = setTimeout(() => setShowPasswordField(true), 500);
     setPauseTimer(t);
     return () => clearTimeout(t);
   }, [loading, usernameExists]);

  const router = useRouter();

   const handleContinue = async () => {
     setLocalError('');
     setLoading(true);
     try {
       if (usernameExists === false) {
         // Register new user inline
         const userId = undefined; // Let Appwrite generate
         await signupEmailPassword(usernameToEmail(username), password, username, userId);
         setStep('phrase');
         return;
       } else {
         // Login existing user
         await loginEmailPassword(usernameToEmail(username), password);
         setStep('phrase');
         return;
       }
     } catch (e: any) {
       setLocalError(e?.message || (usernameExists === false ? 'Signup failed' : 'Login failed'));
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
            key="password-area"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            style={{ overflow: 'hidden', minHeight: 80 }}
          >
            {loading || usernameExists === null ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 80 }}>
                <CircularProgress size={32} />
              </div>
            ) : showPasswordField && (
              <>
                {usernameExists === true && (
                  <Typography color="primary" sx={{ mt: 1 }}>Welcome back! Please sign in.</Typography>
                )}
                {usernameExists === false && (
                  <Typography color="secondary" sx={{ mt: 1 }}>Let’s create your account. Please choose a password.</Typography>
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
                  {usernameExists === false ? 'Sign up' : 'Sign in'}
                </Button>
                {localError && <Typography color="error">{localError}</Typography>}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {error && <Typography color="error">{error}</Typography>}
    </motion.div>
  );
}
