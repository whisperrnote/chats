'use client';
import { useState } from 'react';
import { Typography, TextField, Button, Link, Box, Stack, Alert, InputAdornment } from '@mui/material';
import { motion } from 'framer-motion';
import { useAuthFlow } from '@/store/authFlow';
import { useRouter } from 'next/navigation';
import { Person, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import { loginEmailPassword, signupEmailPassword, usernameToEmail, findUserByUsername } from '@/lib/appwrite';

export default function AuthUsernameInput() {
   const {
    username, setUsername,
    loading, setLoading,
    step, setStep,
    error, setError,
    setUsernameExists
   } = useAuthFlow();  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const [intent, setIntent] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

   const handleContinue = async () => {
    setLocalError('');
    setLoading(true);
    try {
      // Check if username exists
      const user = await findUserByUsername(username);
      if (intent === 'signup') {
        if (user) {
          setLocalError('Username already exists. Please choose another.');
          setUsernameExists(true);
          setLoading(false);
          return;
        }
        setUsernameExists(false);
        setStep('phrase');
        return;
      } else {
         if (!user) {
          setLocalError('Username does not exist.');
          setUsernameExists(false);
          setLoading(false);
          return;
        }
        // Authenticate with Appwrite
        try {
          await loginEmailPassword(usernameToEmail(username), password);
        } catch (err: any) {
          setLocalError('Incorrect password.');
          setLoading(false);
          return;
        }
        setUsernameExists(true);
        setStep('phrase');
        return;      }
    } catch (e: any) {
      setLocalError(e?.message || (intent === 'signup' ? 'Signup failed' : 'Login failed'));
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Stack spacing={4}>
        {/* Header */}
        <Box textAlign="center">
          <Typography 
            variant="h4" 
            fontWeight={700}
            sx={{ 
              mb: 1,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {intent === 'signup' ? 'Create Account' : 'Welcome Back'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {intent === 'signup' 
              ? 'Join thousands of users who trust Whisperrchat' 
              : 'Sign in to your secure account'
            }
          </Typography>
        </Box>

        {/* Form */}
        <Stack spacing={3}>
          <TextField
            label="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            fullWidth
            autoFocus
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderWidth: 2,
                },
              },
            }}
          />
          
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
             value={password}
             onChange={e => setPassword(e.target.value) /* update shared state */}            fullWidth
            variant="outlined"
            autoFocus={!!username}
            onKeyDown={e => {
              if (e.key === 'Enter' && password) {
                handleContinue();
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={togglePasswordVisibility}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderWidth: 2,
                },
              },
            }}
          />

          {/* Error Display */}
          {(localError || error) && (
            <Alert severity="error" sx={{ borderRadius: 2 }}>
              {localError || error}
            </Alert>
          )}

          {/* Submit Button */}
          <Button
            variant="contained"
            size="large"
            onClick={handleContinue}
            disabled={loading || !username || !password}
            fullWidth
            sx={{
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              fontSize: '1rem',
              textTransform: 'none',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4c93 100%)',
                transform: 'translateY(-1px)',
                boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
              },
              '&:disabled': {
                background: 'rgba(0, 0, 0, 0.12)',
                transform: 'none',
                boxShadow: 'none',
              },
              transition: 'all 0.2s ease',
            }}
          >
            {loading ? 'Please wait...' : (intent === 'signup' ? 'Create Account' : 'Sign In')}
          </Button>
        </Stack>

        {/* Toggle Auth Mode */}
        <Box textAlign="center">
          {intent === 'login' ? (
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{' '}
              <Link 
                component="button" 
                variant="body2" 
                onClick={() => setIntent('signup')}
                sx={{ 
                  fontWeight: 600,
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Sign up for free
              </Link>
            </Typography>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <Link 
                component="button" 
                variant="body2" 
                onClick={() => setIntent('login')}
                sx={{ 
                  fontWeight: 600,
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Sign in here
              </Link>
            </Typography>
          )}
        </Box>

        {/* Trust Indicators */}
        <Box
          sx={{
            mt: 4,
            p: 3,
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            background: 'rgba(102, 126, 234, 0.05)',
          }}
        >
          <Stack spacing={1}>
            <Typography variant="caption" color="text.secondary" textAlign="center">
              🔒 Your data is encrypted end-to-end
            </Typography>
            <Typography variant="caption" color="text.secondary" textAlign="center">
              🌟 Open source • No tracking • Always free
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </motion.div>
  );
}
