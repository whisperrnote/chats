'use client';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Auth from '@/components/auth/Auth';
import Topbar from '@/components/layout/Topbar';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';
import { useAuthFlow } from '@/store/authFlow';
import { useTheme } from '@/store/theme';
import { createAppTheme } from '@/theme/theme';
import { useAuth } from '@/hooks/useAuth';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Typography, Stack, Card, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

// Replaced by shared Topbar
// (Replaced by shared Topbar for theme consistency)

function AuthBackground() {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        background: `
          radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(118, 75, 162, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(245, 101, 101, 0.05) 0%, transparent 50%)
        `,
      }}
    />
  );
}

export default function AuthPage() {
  const { currentTheme } = useTheme();
  const theme = createAppTheme(currentTheme);
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Redirect to /app after authentication is complete
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/app');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <Box sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'background.default',
      }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Image
            src="/images/logo.png"
            alt="Loading"
            width={48}
            height={48}
            style={{ borderRadius: 8 }}
          />
        </motion.div>
      </Box>
    );
  }

  const containerVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthBackground />
      
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
         <Topbar />
        
        <Container 
          maxWidth="sm" 
          sx={{ 
            flex: 1,
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            py: 4,
          }}
        >
          <motion.div
            variants={containerVariants}
            initial="initial"
            animate="animate"
            style={{ width: '100%', maxWidth: 440 }}
          >
            <Card
              elevation={0}
              sx={{
                p: { xs: 4, sm: 6 },
                borderRadius: 4,
                border: '1px solid',
                borderColor: 'divider',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
                ...(currentTheme === 'dark' && {
                  background: 'rgba(18, 18, 18, 0.8)',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                }),
              }}
            >
              <Auth />
            </Card>
          </motion.div>
        </Container>
      </Box>
    </ThemeProvider>
  );
}