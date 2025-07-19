'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

import {
  AppBar,
  Box,
  Toolbar,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Civic integration flag
const isCivicEnabled = process.env.NEXT_PUBLIC_INTEGRATION_CIVIC === "true";

// Import Navbar from chat if Civic is enabled
let CivicNavbar: React.FC | null = null;
if (isCivicEnabled) {
  // @ts-ignore
  CivicNavbar = require('/home/nathfavour/Documents/code/whisperrnote/chat/src/components/layout/Navbar').Navbar;
}

// Use only brown shades and subtle green hints for gradients/highlights
const GlassAppBar = styled(AppBar)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(90deg, rgba(35,24,14,0.92) 70%, rgba(78,205,196,0.08) 100%)'
    : 'linear-gradient(90deg, #f5e9da 70%, #b7e6c8 100%)',
  backdropFilter: 'blur(20px)',
  borderRadius: '0 0 24px 24px',
  boxShadow: '0 8px 32px rgba(124,77,30,0.09)',
  border: `1px solid ${theme.palette.mode === 'dark' ? '#3a2a18' : '#e8ded6'}`,
  position: 'sticky',
  top: 0,
  zIndex: 1000,
}));

export default function Topbar() {
  const router = useRouter();

  if (isCivicEnabled && CivicNavbar) {
    // Render Civic Navbar from chat
    return <CivicNavbar />;
  }

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
          {/* Logo image */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
          </Box>
              alt="whisperrchat logo"
              width={40}ar>
              height={40}</motion.div>
              style={{ borderRadius: 8, marginRight: 12 }} );















}  );    </motion.div>      </GlassAppBar>        </Toolbar>          </Box>            <ContinueButton onClick={() => router.push('/auth')} />            <ThemeSwitcher />          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>          </Box>            <Navigation />          <Box sx={{ flex: 1, justifyContent: 'center', display: 'flex' }}>          </Box>            />              priority}