'use client';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import AuthPhraseInputOrGen from '@/components/auth/AuthPhraseInputOrGen';
import AuthShowPhrase from '@/components/auth/AuthShowPhrase';
import AuthUsernameInput from '@/components/auth/AuthUsernameInput';
import Topbar from '@/components/layout/Topbar';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';
import { useAuthFlow } from '@/store/authFlow';
import { useTheme } from '@/store/theme';
import { createAppTheme } from '@/theme/theme';
import { useAuth } from '@/store/auth';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Typography, Stack, Card, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

// Replaced by shared Topbar
// function AuthHeader() {}
// (Replaced by shared Topbar for theme consistency)
  const router = useRouter();
  
  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid',
        borderColor: 'divider',
        py: 2,
      }}
    >
      <Container maxWidth="lg">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={2}>
            <IconButton
              onClick={() => router.push('/')}
              sx={{
                bgcolor: 'action.hover',
                '&:hover': { bgcolor: 'action.selected' },
              }}
            >
              <ArrowBack />
            </IconButton>
            
            <Stack direction="row" alignItems="center" spacing={2}>
              <Image
                src="/images/logo.png"
                alt="whisperrchat logo"
                width={32}
                height={32}
                style={{ borderRadius: 6 }}
                priority
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  letterSpacing: '-0.02em',
                }}
              >
                Whisperrchat
              </Typography>
            </Stack>
          </Stack>
          
          <ThemeSwitcher />
        </Stack>
      </Container>
    </Box>
  );
}

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
  const { step, setUsername, setStep } = useAuthFlow();
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Redirect to /app after authentication is complete
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/app');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (step === 'done') {
      window.location.href = '/app';
    }
  }, [step]);

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
              {step === 'username' && <AuthUsernameInput />}
              {step === 'phrase' && <AuthPhraseInputOrGen />}
              {step === 'showPhrase' && <AuthShowPhrase />}
            </Card>

            {/* Step Indicator */}
            <Stack 
              direction="row" 
              spacing={1} 
              justifyContent="center" 
              sx={{ mt: 4 }}
            >
              {['username', 'phrase', 'showPhrase'].map((stepName, index) => (
                <Box
                  key={stepName}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: step === stepName 
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : 'divider',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </Stack>
          </motion.div>
        </Container>
      </Box>
    </ThemeProvider>
  );
}