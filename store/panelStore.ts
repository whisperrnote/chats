import { create } from 'zustand';

export type PanelType = 'chats' | 'contacts' | 'profile' | 'settings' | 'extensions' | null;

type PanelState = {
  activePanel: PanelType;
  isSecondaryPanelOpen: boolean;
  setActivePanel: (panel: PanelType) => void;
  toggleSecondaryPanel: () => void;
  openSecondaryPanel: () => void;
  closeSecondaryPanel: () => void;
};

export const usePanelStore = create<PanelState>((set) => ({
  activePanel: 'chats',
  isSecondaryPanelOpen: true,
  setActivePanel: (panel) => set({ activePanel: panel, isSecondaryPanelOpen: true }),
  toggleSecondaryPanel: () => set((state) => ({ isSecondaryPanelOpen: !state.isSecondaryPanelOpen })),
  openSecondaryPanel: () => set({ isSecondaryPanelOpen: true }),
  closeSecondaryPanel: () => set({ isSecondaryPanelOpen: false }),
}));
