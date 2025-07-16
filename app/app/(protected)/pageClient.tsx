'use client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from '@/store/theme';
import { createAppTheme } from '@/theme/theme';
import PatternBackground from '@/components/ui/PatternBackground';
import AppShell from '@/components/layout/AppShell';
import { AnimationProvider } from '@/components/providers/AnimationProvider';
import { motion } from 'framer-motion';

export default function PageClient() {
  const { currentTheme } = useTheme();
  const theme = createAppTheme(currentTheme);

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
            <AppShell />
          </motion.div>
        </PatternBackground>
      </AnimationProvider>
    </ThemeProvider>
  );
}
