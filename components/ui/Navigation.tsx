'use client';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 600,
  borderRadius: 12,
  padding: '8px 16px',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.1)',
  },
}));

export default function Navigation() {
  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <NavButton>Features</NavButton>
      </motion.div>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <NavButton>Security</NavButton>
      </motion.div>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <NavButton>About</NavButton>
      </motion.div>
    </Box>
  );
}
