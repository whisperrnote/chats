import { createTheme } from '@mui/material/styles';

export const createAppTheme = (mode: 'light' | 'dark') => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#4ECDC4' : '#667eea',
      },
      secondary: {
        main: mode === 'dark' ? '#FF6B6B' : '#764ba2',
      },
      background: {
        default: mode === 'dark' ? '#0a0a0a' : '#f8f9fa',
        paper: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.9)',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 900,
      },
      h2: {
        fontWeight: 800,
      },
      h3: {
        fontWeight: 700,
      },
    },
    shape: {
      borderRadius: 16,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            textTransform: 'none',
            fontWeight: 600,
          },
        },
      },
    },
  });
};
