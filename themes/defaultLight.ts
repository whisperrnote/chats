import { ThemeOptions } from '@mui/material/styles';

const defaultLight: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#8E4B10',
      light: '#C66F2B',
      dark: '#5A2E0A',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#B5835A',
      light: '#EBC39A',
      dark: '#845A33',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F7F2EC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#3D2B1F',
      secondary: '#6E5B4F',
    },
    divider: '#EAE0D5',
    action: {
      active: '#8E4B10',
      hover: 'rgba(142, 75, 16, 0.08)',
      selected: 'rgba(142, 75, 16, 0.16)',
    },
  },
};

export default defaultLight;
