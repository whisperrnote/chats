'use client';

import { Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import Sidebar from '@/components/app/Sidebar';
import ChatList from '@/components/app/ChatList';
import ChatWindow from '@/components/app/ChatWindow';
import ProfilePanel from '@/components/app/ProfilePanel';
import ExtensionPanel from '@/components/app/ExtensionPanel';
import ResponsiveDrawer from '@/components/app/ResponsiveDrawer';
import { useAppLayout } from '@/store/layout';
import { useEffect } from 'react';
import { useAuth } from '@/store/auth';

export default function AppShell() {
  const theme = useTheme();
  const { showProfile, showExtensions, isMobile } = useAppLayout();
  const { initializeAuth } = useAuth();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <Box
        sx={{
          display: 'flex',
          height: '100vh',
          bgcolor: 'background.default',
          borderRadius: { xs: 0, md: '24px 24px 0 0' },
          overflow: 'hidden',
          boxShadow: theme.shadows[8],
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Sidebar />
        <ChatList />
        <ChatWindow />
        {showProfile && <ProfilePanel />}
        {showExtensions && <ExtensionPanel />}
        {isMobile && <ResponsiveDrawer />}
      </Box>
    </motion.div>
  );
}
