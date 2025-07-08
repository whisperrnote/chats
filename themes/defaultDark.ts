import { Theme } from './types';

const defaultDark: Theme = {
  name: 'Default Dark',
  colors: {
    bg: '#18120b',
    surface: '#23180e',
    primary: '#b97a56',
    accent: '#e0b97a',
    text: '#f5e9da',
    border: '#3a2a18',
    error: '#ff4d4f',
  },
  radius: 12,
  shadow: '0 2px 8px rgba(0,0,0,0.12)',
  font: 'Inter, system-ui, sans-serif',
  pattern: 'geometric',
};

export default defaultDark;
