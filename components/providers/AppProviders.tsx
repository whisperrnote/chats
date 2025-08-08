'use client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from '@/store/theme';
import { createAppTheme } from '@/theme/theme';
import PatternBackground from '@/components/ui/PatternBackground';
import { AnimationProvider } from './AnimationProvider';
import { SnackbarProvider } from './SnackbarProvider';

export default function AppProviders({ children }: { children: React.ReactNode }) {
  const { currentTheme } = useTheme();
  const theme = createAppTheme(currentTheme);

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
