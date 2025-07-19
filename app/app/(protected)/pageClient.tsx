'use client';
import {
  useEffect,
  useState,
} from 'react';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

import AppShell from '@/components/layout/AppShell';
import { AnimationProvider } from '@/components/providers/AnimationProvider';
import PatternBackground from '@/components/ui/PatternBackground';
import {
  getCurrentAccount,
} from '@/lib/appwrite'; // <-- import Appwrite session check
import { useAuthFlow } from '@/store/authFlow';
import { useTheme } from '@/store/theme';
import { createAppTheme } from '@/theme/theme';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

// Civic integration flag
const isCivicEnabled = process.env.NEXT_PUBLIC_INTEGRATION_CIVIC === "true";

// Only import Civic hooks/components if enabled
let useCivicUser: any = null;
if (isCivicEnabled) {
  // @ts-ignore
  useCivicUser = require('@civic/auth-web3/react').useUser;
}

export default function PageClient() {
  const { currentTheme } = useTheme();
  const theme = createAppTheme(currentTheme);
  const router = useRouter();

  // Track auth state and redirect
  const [isChecking, setIsChecking] = useState(true);
  const [username, setUsername] = useState('');

  // Move hook call to top-level
  let civic = null;
  if (isCivicEnabled && useCivicUser) {
    civic = useCivicUser();
  }

  useEffect(() => {
    let shouldRedirect = false;
    let checkedSession = false;

    async function checkAuth() {
      // Civic check
      if (isCivicEnabled && civic) {
        const user = civic.user;
        if (user?.name) {
          setUsername(user.name);
        } else if (user?.username) {
          setUsername(user.username);
        } else if (user?.email) {
          setUsername(user.email);
        } else {
          shouldRedirect = true;
        }
        if (!user) shouldRedirect = true;
      } else {
        const { username: authUsername } = useAuthFlow.getState();
        if (authUsername) {
          setUsername(authUsername);
        } else {
          shouldRedirect = true;
        }
      }

      // Appwrite session check
      try {
        await getCurrentAccount();
        checkedSession = true;
      } catch {
        shouldRedirect = true;
      }

      if (shouldRedirect || !checkedSession) {
        router.push('/auth');
      }
      setIsChecking(false);
    }

    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, civic, isCivicEnabled]);

  if (isChecking) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AnimationProvider>
          <PatternBackground>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <div style={{ fontSize: 24, color: '#7c4d1e' }}>Loading...</div>
            </motion.div>
          </PatternBackground>
        </AnimationProvider>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AnimationProvider>
        <PatternBackground>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ height: '100vh' }}
          >
            {/* Welcome message, can be styled or moved as needed */}
            <div style={{ position: 'absolute', top: 24, left: 24, zIndex: 1200, fontWeight: 700, color: '#7c4d1e', fontSize: 18 }}>
              {username && `Welcome ${username}! 👋`}
            </div>
            <AppShell />
          </motion.div>
        </PatternBackground>
      </AnimationProvider>
    </ThemeProvider>
  );
}
