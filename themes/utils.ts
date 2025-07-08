import { Theme } from './types';

export function applyTheme(theme: Theme) {
  if (typeof window === 'undefined') return;
  const root = document.documentElement;
  root.style.setProperty('--color-bg', theme.colors.bg);
  root.style.setProperty('--color-surface', theme.colors.surface);
  root.style.setProperty('--color-primary', theme.colors.primary);
  root.style.setProperty('--color-accent', theme.colors.accent);
  root.style.setProperty('--color-text', theme.colors.text);
  root.style.setProperty('--color-border', theme.colors.border);
  root.style.setProperty('--radius', theme.radius + 'px');
  root.style.setProperty('--shadow', theme.shadow);
  root.style.setProperty('--font', theme.font);
  // Add more as needed
}
