'use client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from '@/store/theme';
import { createAppTheme } from '@/theme/theme';
import PatternBackground from '@/components/ui/PatternBackground';
import { AnimationProvider } from './AnimationProvider';

export default function AppProviders({ children }: { children: React.ReactNode }) {
  const { currentTheme } = useTheme();
  const theme = createAppTheme(currentTheme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AnimationProvider>
        <PatternBackground>
          {children}
        </PatternBackground>
      </AnimationProvider>
    </ThemeProvider>
  );
}
