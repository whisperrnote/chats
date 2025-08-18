import { ThemeOptions } from '@mui/material/styles';

const defaultDark: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#F9A826',
      light: '#FFC947',
      dark: '#C17900',
      contrastText: '#000000',
    },
    secondary: {
      main: '#A1887F',
      light: '#D3B8AE',
      dark: '#725B53',
      contrastText: '#000000',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#E0E0E0',
      secondary: '#BDBDBD',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
    action: {
      active: '#F9A826',
      hover: 'rgba(249, 168, 38, 0.08)',
      selected: 'rgba(249, 168, 38, 0.16)',
    },
  },
};

export default defaultDark;
