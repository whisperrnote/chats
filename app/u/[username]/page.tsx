import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createAppTheme } from '@/theme/theme';
import PatternBackground from '@/components/ui/PatternBackground';
import PageClient from './pageClient';

export default function UserProfilePage() {
  const theme = createAppTheme('light'); // Default theme for public pages

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PatternBackground>
        <PageClient />
      </PatternBackground>
    </ThemeProvider>
  );
}
