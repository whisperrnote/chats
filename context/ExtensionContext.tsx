import { createContext, useContext } from 'react';
import { useExtensions } from '../hooks/useExtensions';

const ExtensionContext = createContext<ReturnType<typeof useExtensions> | null>(null);

export function ExtensionProvider({ children }: { children: React.ReactNode }) {
  const value = useExtensions();
  return <ExtensionContext.Provider value={value}>{children}</ExtensionContext.Provider>;
}

export function useExtensionContext() {
  const ctx = useContext(ExtensionContext);
  if (!ctx) throw new Error('useExtensionContext must be used within ExtensionProvider');
  return ctx;
}
