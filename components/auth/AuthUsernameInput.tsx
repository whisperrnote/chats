'use client';
import { useState } from 'react';
import { Typography, TextField, Button, Box, Stack, Alert, InputAdornment } from '@mui/material';
import { motion } from 'framer-motion';
import { useAuthFlow } from '@/store/authFlow';
import { Person } from '@mui/icons-material';
import { findUserByUsername } from '@/lib/appwrite';

export default function AuthUsernameInput() {
  const {
    username,
    setUsername,
    loading,
    setLoading,
    setStep,
    error,
    setError,
    setUsernameExists,
  } = useAuthFlow();
  const [localError, setLocalError] = useState('');

  const handleContinue = async () => {
    setLocalError('');
    setLoading(true);
    try {
      const user = await findUserByUsername(username);
      setUsernameExists(!!user);
      setStep('phrase');
    } catch (e: any) {
      setLocalError(e?.message || 'Failed to check username');
      setError(e?.message || 'Failed to check username');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Stack spacing={4}>
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
            Enter Your Username
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Let's get started by finding your account or creating a new one.
          </Typography>
        </Box>

        <Stack spacing={3}>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

          {(localError || error) && (
            <Alert severity="error" sx={{ borderRadius: 2 }}>
              {localError || error}
            </Alert>
          )}

          <Button
            variant="contained"
            size="large"
            onClick={handleContinue}
            disabled={loading || !username}
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
            {loading ? 'Please wait...' : 'Continue'}
          </Button>
        </Stack>

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
