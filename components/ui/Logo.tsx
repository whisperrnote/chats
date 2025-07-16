'use client';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

export default function Logo() {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(255, 107, 107, 0.3)',
            }}
          >
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 900 }}>
              W
            </Typography>
          </Box>
        </motion.div>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Whisperrchat
        </Typography>
      </Box>
    </motion.div>
  );
}
