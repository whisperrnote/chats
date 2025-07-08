import { createContext, useContext } from 'react';
import { usePanels } from '../hooks/usePanels';

const PanelContext = createContext<ReturnType<typeof usePanels> | null>(null);

export function PanelProvider({ children }: { children: React.ReactNode }) {
  const value = usePanels();
  return <PanelContext.Provider value={value}>{children}</PanelContext.Provider>;
}

export function usePanelContext() {
  const ctx = useContext(PanelContext);
  if (!ctx) throw new Error('usePanelContext must be used within PanelProvider');
  return ctx;
}
