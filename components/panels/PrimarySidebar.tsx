'use client';

import {
  useState,
  useEffect,
} from 'react';

import {
  Box,
  IconButton,
  Tooltip,
  useTheme,
  Avatar,
  Stack,
  Typography,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  Chat,
  People,
  Person,
  Settings,
  Extension,
  Logout,
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

import { usePanelStore } from '@/store/panelStore';
import { useAuth } from '@/store/auth';
import Logo from '@/components/ui/Logo';

const SidebarContainer = styled(motion.div)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  backgroundColor: alpha(theme.palette.background.paper, 0.8),
  backdropFilter: 'blur(12px)',
  borderRight: `1px solid ${theme.palette.divider}`,
  transition: 'width 0.3s ease-in-out',
  overflow: 'hidden',
  width: 80,
  padding: theme.spacing(1, 0),
}));

const NavButton = styled(IconButton)(({ theme }) => ({
  width: 56,
  height: 56,
  borderRadius: theme.shape.borderRadius * 1.5,
  color: theme.palette.text.secondary,
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.9),
    },
  },
  '&:hover': {
    backgroundColor: alpha(theme.palette.text.primary, 0.05),
    color: theme.palette.text.primary,
  },
}));

const UserProfileContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1, 0.5),
  cursor: 'pointer',
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    backgroundColor: alpha(theme.palette.text.primary, 0.05),
  },
}));

export default function PrimarySidebar() {
  const theme = useTheme();
  const {
    activePanel,
    setActivePanel,
    isSecondaryPanelOpen,
    toggleSecondaryPanel,
  } = usePanelStore();
  const { user, logout } = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handlePanelChange = (panel) => {
    if (activePanel === panel && isSecondaryPanelOpen) {
      toggleSecondaryPanel();
    } else {
      setActivePanel(panel);
      if (!isSecondaryPanelOpen) {
        toggleSecondaryPanel();
      }
    }
  };

  if (!isMounted) {
    return (
      <Box sx={{
        width: 80,
        height: '100vh',
        backgroundColor: 'background.paper',
        borderRight: `1px solid ${theme.palette.divider}`,
      }} />
    );
  }

  return (
    <SidebarContainer
      initial={{ x: -80 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <Box sx={{ p: 1, display: 'flex', justifyContent: 'center', height: 64 }}>
        <Logo />
      </Box>

      <AnimatePresence>
        <Stack
          component={motion.div}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              },
            },
          }}
          initial="hidden"
          animate="visible"
          direction="column"
          spacing={1}
          alignItems="center"
          sx={{ flexGrow: 1, py: 2 }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <Tooltip title="Chats" placement="right">
              <NavButton
                onClick={() => handlePanelChange('chats')}
                className={activePanel === 'chats' ? 'Mui-selected' : ''}
              >
                <Chat />
              </NavButton>
            </Tooltip>
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <Tooltip title="Contacts" placement="right">
              <NavButton
                onClick={() => handlePanelChange('contacts')}
                className={activePanel === 'contacts' ? 'Mui-selected' : ''}
              >
                <People />
              </NavButton>
            </Tooltip>
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <Tooltip title="Extensions" placement="right">
              <NavButton
                onClick={() => handlePanelChange('extensions')}
                className={activePanel === 'extensions' ? 'Mui-selected' : ''}
              >
                <Extension />
              </NavButton>
            </Tooltip>
          </motion.div>
        </Stack>
      </AnimatePresence>

      <Stack direction="column" spacing={1} alignItems="center" sx={{ pb: 2 }}>
        <Tooltip title={isSecondaryPanelOpen ? 'Collapse' : 'Expand'} placement="right">
          <IconButton onClick={toggleSecondaryPanel}>
            {isSecondaryPanelOpen ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Tooltip>
        <Tooltip title="Settings" placement="right">
          <NavButton
            onClick={() => handlePanelChange('settings')}
            className={activePanel === 'settings' ? 'Mui-selected' : ''}
          >
            <Settings />
          </NavButton>
        </Tooltip>
        <Tooltip title="Profile" placement="right">
          <UserProfileContainer onClick={() => handlePanelChange('profile')}>
            <Avatar
              sx={{ width: 40, height: 40 }}
              src={user?.avatarUrl}
              alt={user?.displayName || user?.username}
            >
              {user?.displayName?.[0] || user?.username?.[0]}
            </Avatar>
          </UserProfileContainer>
        </Tooltip>
        <Tooltip title="Logout" placement="right">
          <IconButton onClick={logout}>
            <Logout />
          </IconButton>
        </Tooltip>
      </Stack>
    </SidebarContainer>
  );
}
