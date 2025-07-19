'use client';
import { useEffect } from 'react';

import { motion } from 'framer-motion';
import Image from 'next/image';

import AuthDone from '@/components/auth/AuthDone';
import AuthPasscodeInput from '@/components/auth/AuthPasscodeInput';
import AuthPhraseInputOrGen from '@/components/auth/AuthPhraseInputOrGen';
import AuthShowPhrase from '@/components/auth/AuthShowPhrase';
import AuthUsernameInput from '@/components/auth/AuthUsernameInput';
import PatternBackground from '@/components/ui/PatternBackground';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';
import { useAuthFlow } from '@/store/authFlow';
import { useTheme } from '@/store/theme';
import { createAppTheme } from '@/theme/theme';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

// Civic integration flag
const isCivicEnabled = process.env.NEXT_PUBLIC_INTEGRATION_CIVIC === "true";

// Only import Civic hooks/components if enabled
let CivicUserButton: any = null;
let useCivicUser: any = null;
if (isCivicEnabled) {
  // @ts-ignore
  CivicUserButton = require('@civic/auth-web3/react').UserButton;
  // @ts-ignore
  useCivicUser = require('@civic/auth-web3/react').useUser;
}

function AuthTopbar() {
  const { currentTheme } = useTheme();
  return (
    <Box
      sx={{
        width: '100%',
        height: 72,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: 2, md: 4 },
        py: 1,
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: currentTheme === 'dark'
          ? 'linear-gradient(90deg, rgba(35,24,14,0.92) 70%, rgba(78,205,196,0.08) 100%)'
          : 'linear-gradient(90deg, #f5e9da 70%, #b7e6c8 100%)',
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${currentTheme === 'dark' ? '#3a2a18' : '#e8ded6'}`,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Image
          src="/images/logo.png"
          alt="whisperrchat logo"
          width={40}
          height={40}
          style={{ borderRadius: 8, marginRight: 12 }}
          priority
        />
        <Box sx={{
          fontWeight: 900,
          fontSize: 22,
          letterSpacing: 1.2,
          color: currentTheme === 'dark' ? '#b97a56' : '#7c4d1e',
          textShadow: '0 2px 12px #e0c9b680',
          userSelect: 'none',
        }}>
          whisperrchat
        </Box>
      </Box>
      <ThemeSwitcher />
    </Box>
  );
}

export default function AuthPage() {
  const { currentTheme } = useTheme();
  const theme = createAppTheme(currentTheme);
  const { step, setUsername, nextStep } = useAuthFlow();

  const panelVariants = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0, transition: { type: 'spring', duration: 0.6 } }
  };

  // Use only brown shades for backgrounds
  const panelBg =
    currentTheme === 'dark'
      ? '#23180e'
      : '#f5e9da';

  // Civic Auth logic
  let civicUser = null;
  if (isCivicEnabled && useCivicUser) {
    civicUser = useCivicUser().user;
  }

  // If Civic user is present and we're on username step, set username and proceed
  useEffect(() => {
    if (
      isCivicEnabled &&
      civicUser &&
      step === 'username' &&
      civicUser.username
    ) {
      setUsername(civicUser.username);
      nextStep();
    }
  }, [isCivicEnabled, civicUser, step, setUsername, nextStep]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PatternBackground>
        <AuthTopbar />
        <Container maxWidth="sm" sx={{ py: 8, minHeight: 'calc(100vh - 72px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div
            variants={panelVariants}
            initial="initial"
            animate="animate"
            style={{
              background: panelBg,
              borderRadius: 24,
              boxShadow: '0 8px 32px rgba(124,77,30,0.13)',
              padding: 36,
              width: '100%',
              maxWidth: 420,
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <Box sx={{ width: '100%' }}>
              {step === 'username' && (
                <>
                  <AuthUsernameInput />
                  {isCivicEnabled && (
                    <>
                      <Box sx={{ my: 3, textAlign: 'center', color: '#7c4d1e', fontWeight: 700 }}>
                        — or —
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <CivicUserButton />
                      </Box>
                    </>
                  )}
                </>
              )}
              {step === 'phrase' && <AuthPhraseInputOrGen />}
              {step === 'showPhrase' && <AuthShowPhrase />}
              {step === 'passcode' && <AuthPasscodeInput />}
              {step === 'done' && <AuthDone />}
            </Box>
          </motion.div>
        </Container>
      </PatternBackground>
    </ThemeProvider>
  );
}