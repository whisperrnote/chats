'use client';
import { IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from '../../store/theme';

const GlassButton = styled(IconButton)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '12px',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.2)',
    transform: 'translateY(-2px)',
  },
  transition: 'all 0.3s ease',
}));

export default function ThemeSwitcher() {
  const { currentTheme, toggleTheme } = useTheme();

  return (
    <Tooltip title={`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`}>
      <GlassButton
        onClick={toggleTheme}
        component={motion.button}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: currentTheme === 'dark' ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {currentTheme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </motion.div>
      </GlassButton>
    </Tooltip>
  );
}
