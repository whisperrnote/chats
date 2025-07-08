import { create } from 'zustand';

interface PanelState {
  activePanel: string;
  setActivePanel: (panel: string) => void;
}

export const usePanelStore = create<PanelState>((set) => ({
  activePanel: 'chat',
  setActivePanel: (panel) => set({ activePanel: panel }),
}));
