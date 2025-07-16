'use client';
import { AppBar, Toolbar, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Logo from '../ui/Logo';
import Navigation from '../ui/Navigation';
import ThemeSwitcher from '../ui/ThemeSwitcher';
import ContinueButton from '../ui/ContinueButton';

const GlassAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(20px)',
  borderRadius: '0 0 24px 24px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
}));

export default function Topbar() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <GlassAppBar elevation={0}>
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            px: { xs: 2, md: 4 },
            minHeight: { xs: 56, md: 64 },
          }}
        >
          <Logo />
          {/* Navigation always visible, but can be styled for mobile */}
          <Box sx={{ flex: 1, justifyContent: 'center', display: 'flex' }}>
            <Navigation />
          </Box>
          {/* Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <ThemeSwitcher />
            <ContinueButton onClick={() => router.push('/auth')} />
          </Box>
        </Toolbar>
      </GlassAppBar>
    </motion.div>
  );
}