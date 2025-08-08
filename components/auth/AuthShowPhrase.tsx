'use client';
import { Typography, Box, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useAuthFlow } from '@/store/authFlow';

export default function AuthShowPhrase() {
  const { phrase, setStep } = useAuthFlow();

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
      <Button
        variant="contained"
        onClick={() => setStep('passcode')}
      >
        Continue
      </Button>
    </motion.div>
  );
}
