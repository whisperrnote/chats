'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import ContinueButton from '@/components/ui/ContinueButton';
import Navigation from '@/components/ui/Navigation';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';
import { useAuthFlow } from '@/store/authFlow';
import {
  AppBar,
  Box,
  Toolbar,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Civic integration flag
const isCivicEnabled = process.env.NEXT_PUBLIC_INTEGRATION_CIVIC === "true";

// Only import Civic hooks/components if enabled
let useCivicUser: any = null;
let CivicUserButton: any = null;
if (isCivicEnabled) {
  // @ts-ignore
  useCivicUser = require('@civic/auth-web3/react').useUser;
  // @ts-ignore
  CivicUserButton = require('@civic/auth-web3/react').UserButton;
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

  // Get username from Civic or fallback to auth flow
  let username = '';
  let userButton = null;

  if (isCivicEnabled && useCivicUser) {
    const civic = useCivicUser();
    if (civic?.user?.name) {
      username = civic.user.name;
    } else if (civic?.user?.username) {
      username = civic.user.username;
    } else if (civic?.user?.email) {
      username = civic.user.email;
    }
    userButton = <CivicUserButton />;
  } else {
    // fallback to normal auth flow
    const { username: authUsername } = useAuthFlow();
    username = authUsername;
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
            <Image
              src="/images/logo.png"
              alt="whisperrchat logo"
              width={40}
              height={40}
              style={{ borderRadius: 8, marginRight: 12 }}
              priority
            />
          </Box>
          <Box sx={{ flex: 1, justifyContent: 'center', display: 'flex' }}>
            <Navigation />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <ThemeSwitcher />
            {/* Show username if available */}
            {username && (
              <Box sx={{ fontWeight: 600, color: '#7c4d1e', px: 2 }}>
                {`Hello ${username}! 👋`}
              </Box>
            )}
            {/* Removed Civic user button (Sign In) */}
            <ContinueButton onClick={() => router.push('/auth')} />
          </Box>
        </Toolbar>
      </GlassAppBar>
    </motion.div>
  );
}