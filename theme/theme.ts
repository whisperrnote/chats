import { createTheme } from '@mui/material/styles';

export const createAppTheme = (mode: 'light' | 'dark') => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#b97a56' : '#a86b32', // warm brown
      },
      secondary: {
        main: mode === 'dark' ? '#e0b97a' : '#c69c6d', // accent gold
      },
      background: {
        default: mode === 'dark' ? '#18120b' : '#f5e9da', // brick-wall/dirt-brown or light brown
        paper: mode === 'dark' ? 'rgba(35,24,14,0.95)' : 'rgba(255,255,255,0.92)', // glassmorphism
      },
      text: {
        primary: mode === 'dark' ? '#f5e9da' : '#7c4d1e', // light sand or brown
        secondary: mode === 'dark' ? '#e0b97a' : '#a86b32',
      },
      divider: mode === 'dark' ? '#3a2a18' : '#e8ded6',
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 900,
        color: mode === 'dark' ? '#f5e9da' : '#7c4d1e',
      },
      h2: {
        fontWeight: 800,
        color: mode === 'dark' ? '#e0b97a' : '#a86b32',
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
            background: mode === 'dark'
              ? 'linear-gradient(90deg, #b97a56 60%, #e0b97a 100%)'
              : 'linear-gradient(90deg, #a86b32 60%, #c69c6d 100%)',
            color: mode === 'dark' ? '#f5e9da' : '#7c4d1e',
            boxShadow: '0 3px 16px #7c4d1e22',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: mode === 'dark'
              ? 'rgba(35,24,14,0.92)'
              : 'rgba(255,255,255,0.92)',
            borderBottom: `1.5px solid ${mode === 'dark' ? '#3a2a18' : '#e8ded6'}`,
            boxShadow: '0 6px 32px 0 rgba(124,77,30,0.09)',
            borderRadius: '0 0 18px 18px',
            backdropFilter: 'blur(12px)',
          },
        },
      },
    },
  });
};
