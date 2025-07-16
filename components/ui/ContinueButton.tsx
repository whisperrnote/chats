'use client';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const GlassButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, rgba(255, 107, 107, 0.2), rgba(78, 205, 196, 0.2))',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '12px',
  color: theme.palette.text.primary,
  fontWeight: 700,
  padding: '12px 24px',
  '&:hover': {
    background: 'linear-gradient(45deg, rgba(255, 107, 107, 0.3), rgba(78, 205, 196, 0.3))',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(255, 107, 107, 0.3)',
  },
  transition: 'all 0.3s ease',
}));

export default function ContinueButton({ onClick }: { onClick: () => void }) {
  return (
    <GlassButton
      component={motion.button}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      Continue
    </GlassButton>
  );
}
