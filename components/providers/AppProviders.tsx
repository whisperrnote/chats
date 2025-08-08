'use client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from '@/store/theme';
import { createAppTheme } from '@/theme/theme';
import PatternBackground from '@/components/ui/PatternBackground';
import { AnimationProvider } from './AnimationProvider';
import { SnackbarProvider } from './SnackbarProvider';

import { useEffect } from 'react';
import { useAuth } from '@/store/auth';

export default function AppProviders({ children }: { children: React.ReactNode }) {
  const { currentTheme } = useTheme();
  const theme = createAppTheme(currentTheme);
  const { initializeAuth } = useAuth();
  useEffect(() => { initializeAuth(); }, [initializeAuth]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <AnimationProvider>
          <PatternBackground>
            {children}
          </PatternBackground>
        </AnimationProvider>
      </SnackbarProvider>
    </ThemeProvider>  );
}
