import { Typography } from '@mui/material';
import { motion } from 'framer-motion';

export default function AuthDone() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Typography variant="h5" mb={2}>Authentication Complete!</Typography>
      <Typography variant="body1" mb={2}>
        You are now logged in. Your data is encrypted and secure.
      </Typography>
      {/* Redirect or show next steps */}
    </motion.div>
  );
}
