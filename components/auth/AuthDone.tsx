'use client';
import { Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function AuthDone() {
  const router = useRouter();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Typography variant="h5" mb={2}>Authentication Complete!</Typography>
      <Typography variant="body1" mb={2}>
        You are now logged in. Your data is encrypted and secure.
      </Typography>
      <Button
        variant="contained"
        onClick={() => router.push('/app')}
      >
        Go to App
      </Button>
    </motion.div>
  );
}
