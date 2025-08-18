'use client';

import { Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import PrimarySidebar from '@/components/panels/PrimarySidebar';
import SecondaryPanel from '@/components/panels/SecondaryPanel';
import ChatWindow from '@/components/chat/ChatWindow';
import { useAuth } from '@/store/auth';

export default function AppShell() {
  const theme = useTheme();
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/auth');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'background.default',
        }}
      >
        <span>Loading...</span>
      </Box>
    );
  }

  return (
    <motion.div
      initial={{ scale: 0.98, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}
    >
      <Box
        sx={{
          display: 'flex',
          height: '100%',
          width: '100%',
          backgroundColor: 'background.paper',
          boxShadow: theme.shadows[3],
        }}
      >
        <PrimarySidebar />
        <SecondaryPanel />
        <ChatWindow />
      </Box>
    </motion.div>
  );
}
