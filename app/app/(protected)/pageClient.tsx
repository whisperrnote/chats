'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

import AppShell from '@/components/layout/AppShell';
import { AnimationProvider } from '@/components/providers/AnimationProvider';
import PatternBackground from '@/components/ui/PatternBackground';
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

  // Civic user logic
  let username = '';
  let user = null;
  if (isCivicEnabled && useCivicUser) {
    const civic = useCivicUser();
    user = civic.user;
    if (user?.name) {
      username = user.name;
    } else if (user?.username) {
      username = user.username;
    } else if (user?.email) {
      username = user.email;
    }
    // Redirect to /auth if not authenticated
    if (!user) {
      if (typeof window !== 'undefined') {
        router.push('/auth');
      }
      return null;
    }
  } else {
    // fallback to normal auth flow
    const { username: authUsername } = useAuthFlow();
    username = authUsername;
    // If not authenticated, redirect to /auth
    if (!username) {
      if (typeof window !== 'undefined') {
        router.push('/auth');
      }
      return null;
    }
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
