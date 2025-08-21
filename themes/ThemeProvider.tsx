import { createContext, useContext, useState, ReactNode } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider, Theme as MuiTheme, ThemeOptions } from '@mui/material/styles';
import defaultDark from './defaultDark';

const ThemeContext = createContext<{ theme: MuiTheme; setTheme: (t: ThemeOptions) => void } | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeOptions, setThemeOptions] = useState<ThemeOptions>(defaultDark);
  const theme = createTheme(themeOptions);

  const handleSetTheme = (newTheme: ThemeOptions) => {
    setThemeOptions(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
