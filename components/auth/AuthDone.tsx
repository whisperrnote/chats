'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

import {
  Button,
  Typography,
} from '@mui/material';

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
