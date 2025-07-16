'use client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from '../store/theme';
import { createAppTheme } from '../theme/theme';
import Topbar from '../components/layout/Topbar';
import HeroSection from '../components/home/HeroSection';
import FeatureHighlights from '../components/home/FeatureHighlights';
import PatternBackground from '../components/ui/PatternBackground';

export default function PageClient() {
  const { currentTheme } = useTheme();
  const theme = createAppTheme(currentTheme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PatternBackground>
        <Topbar />
        <HeroSection />
        <FeatureHighlights />
      </PatternBackground>
    </ThemeProvider>
  );
}