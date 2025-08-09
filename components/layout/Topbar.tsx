import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Avatar from '@/components/ui/Avatar';
import { useAuth } from '@/store/auth';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Typography,
  Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const ModernAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  boxShadow: '0 1px 20px rgba(0, 0, 0, 0.1)',
  border: 'none',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  ...(theme.palette.mode === 'dark' && {
    background: 'rgba(18, 18, 18, 0.95)',
    boxShadow: '0 1px 20px rgba(0, 0, 0, 0.3)',
  }),
}));

const Logo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'scale(1.02)',
  },
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
        sx={{
          '& .MuiPaper-root': {
            borderRadius: 2,
            minWidth: 180,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          }
        }}
      >
        <MenuItem onClick={() => { handleClose(); /* Navigate to profile */ }}>
          Profile
        </MenuItem>
        <MenuItem onClick={() => { handleClose(); /* Navigate to settings */ }}>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
          Sign Out
        </MenuItem>
      </Menu>
    </>
  );
}

export default function Topbar() {
  const router = useRouter();
  const { isAuthenticated, user, signOut } = useAuth();

  const handleLogoClick = () => {
    router.push('/');
  };

  const handleGetStarted = () => {
    router.push('/auth');
  };

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <ModernAppBar elevation={0}>
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            px: { xs: 2, md: 4 },
            py: 1,
            minHeight: 72,
          }}
        >
          {/* Logo */}
          <Logo onClick={handleLogoClick}>
            <Image
              src="/images/logo.png"
              alt="whisperrchat logo"
              width={40}
              height={40}
              style={{ borderRadius: 8, marginRight: 12 }}
              priority
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                fontSize: '1.25rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                letterSpacing: '-0.02em',
                display: { xs: 'none', md: 'block' }, // Hide on mobile
              }}
            >
              Whisperrchat
            </Typography>
          </Logo>

          {/* Navigation - could be added later */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
            {/* Add navigation items here if needed */}
          </Box>

          {/* Right side */}
          <Stack direction="row" spacing={2} alignItems="center">
            <ThemeSwitcher />
            
            {isAuthenticated && user ? (
              <AccountMenu user={user} signOut={signOut} />
            ) : (
              <Button
                variant="contained"
                onClick={handleGetStarted}
                sx={{
                  px: 3,
                  py: 1,
                  fontWeight: 600,
                  borderRadius: '50px',
                  textTransform: 'none',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3)',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                Get Started
              </Button>
            )}
          </Stack>
        </Toolbar>
      </ModernAppBar>
    </motion.div>
  );
}
