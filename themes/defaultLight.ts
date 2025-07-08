import { Theme } from './types';

const defaultLight: Theme = {
  name: 'Default Light',
  colors: {
    bg: '#f5e9da',
    surface: '#fff8f0',
    primary: '#b97a56',
    accent: '#e0b97a',
    text: '#23180e',
    border: '#e0b97a',
    error: '#ff4d4f',
  },
  radius: 12,
  shadow: '0 2px 8px rgba(0,0,0,0.08)',
  font: 'Inter, system-ui, sans-serif',
  pattern: 'geometric',
};

export default defaultLight;
