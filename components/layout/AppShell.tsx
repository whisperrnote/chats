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
import { useRouter } from 'next/navigation';

export default function AppShell() {
  const theme = useTheme();
  const { showProfile, showExtensions, isMobile, activeMobileView } = useAppLayout();
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/auth');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <div style={{height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}><span>Loading...</span></div>;
  }

  // MOBILE: Only one view at a time, full screen
  if (isMobile) {
    return (
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            bgcolor: 'background.default',
            borderRadius: 0,
            overflow: 'hidden',
            boxShadow: theme.shadows[8],
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Sidebar />
          {activeMobileView === 'chat' && (
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <ChatList />
              <ChatWindow />
            </Box>
          )}
          {activeMobileView === 'profile' && <ProfilePanel isMobile={true} />}
          {activeMobileView === 'extensions' && <ExtensionPanel isMobile={true} />}
        </Box>
      </motion.div>
    );
  }

  // DESKTOP: Multi-panel, draggable overlays
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
      </Box>
    </motion.div>
  );
}
