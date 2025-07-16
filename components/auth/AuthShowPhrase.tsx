'use client';
import { Typography, Box, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useAuthFlow } from '@/store/authFlow';

export default function AuthShowPhrase() {
  const { phrase, setStep } = useAuthFlow();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Typography variant="h6" mb={2}>Your Recovery Phrase</Typography>
      <Box sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 2, mb: 2 }}>
        <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>{phrase}</Typography>
      </Box>
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
