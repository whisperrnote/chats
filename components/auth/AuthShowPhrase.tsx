'use client';
import { Typography, Box, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useAuthFlow } from '@/store/authFlow';

import { useState } from 'react';
import { createE2EEKeysAndEncryptPrivateKey } from '@/lib/e2ee';
import { updateUser, getCurrentUserId } from '@/lib/appwrite';
import { useSnackbar } from '@/components/providers/SnackbarProvider';

export default function AuthShowPhrase() {
  const { phrase, username, setStep } = useAuthFlow();
  const snackbar = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleContinue = async () => {
    setLoading(true);
    setError('');
    try {
      // Use username as salt for KDF
      const { publicKey, encryptedPrivateKey } = await createE2EEKeysAndEncryptPrivateKey(phrase, username);
      // Update user profile in backend (assume userId is available in session or context)
      const userId = await getCurrentUserId();
      if (!userId) {
        throw new Error('User not authenticated');
      }
      await updateUser(userId, {
        publicKey: Buffer.from(publicKey).toString('base64'),
        encryptedPrivateKey: {
          nonce: Buffer.from(encryptedPrivateKey.nonce).toString('base64'),
          ciphertext: Buffer.from(encryptedPrivateKey.ciphertext).toString('base64'),
        },
        recoveryPhraseBackedUp: true,
      });
      setStep('done');
      snackbar.show('Encryption keys set up! Your data is now end-to-end encrypted.', 'success');
    } catch (err: any) {
      setError(err?.message || 'Failed to set up encryption keys');
      snackbar.show(err?.message || 'Failed to set up encryption keys', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Typography variant="h6" mb={2}>Your Recovery Phrase</Typography>
      <Box sx={{ bgcolor: '#fff', p: 2, borderRadius: 2, mb: 2, border: '1px solid #eee' }}>
        <Typography variant="body1" sx={{ color: '#000', wordBreak: 'break-word', fontWeight: 600, fontSize: 18 }}>{phrase}</Typography>
      </Box>
      <Button
        variant="outlined"
        size="small"
        sx={{ mb: 2 }}
        onClick={() => { navigator.clipboard.writeText(phrase); }}
        fullWidth
      >
        Copy
      </Button>
      <Typography color="warning.main" mb={2}>
        Please write down and securely store your phrase. It cannot be recovered if lost.
      </Typography>
      {error && <Typography color="error" mb={2}>{error}</Typography>}
      <Button
        variant="contained"
        onClick={handleContinue}
        disabled={loading}
      >
        {loading ? 'Setting up...' : 'Continue'}
      </Button>
    </motion.div>
  );
}

