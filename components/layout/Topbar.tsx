import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Avatar from '@/components/ui/Avatar';
import { useAuth } from '@/store/auth';
import Navigation from '@/components/ui/Navigation';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';
import { useAuthFlow } from '@/store/authFlow';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';

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

function AccountMenu({ user, signOut }: { user: any, signOut: () => Promise<void> }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    await signOut();
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleMenu} size="small" sx={{ p: 0 }}>
        <Avatar src={user.avatarUrl} alt={user.displayName || user.username || 'User'} size={32} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleLogout}>Log out</MenuItem>
      </Menu>
    </>
  );
}

export default function Topbar() {
  const router = useRouter();
  const { isAuthenticated, user, signOut } = useAuth();

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
            {/* Show avatar with dropdown if authenticated */}
            {isAuthenticated && user ? (
              <AccountMenu user={user} signOut={signOut} />
            ) : (
              // Show Continue button if not authenticated
              <ContinueButton onClick={() => router.push('/auth')} />
            )}
          </Box>
        </Toolbar>
      </GlassAppBar>
    </motion.div>
  );
}
