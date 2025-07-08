import { createContext, useContext } from 'react';
import { useSettings } from '../hooks/useSettings';

const SettingsContext = createContext<ReturnType<typeof useSettings> | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const value = useSettings();
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettingsContext() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettingsContext must be used within SettingsProvider');
  return ctx;
}
