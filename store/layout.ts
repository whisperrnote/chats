import { create } from 'zustand';

type LayoutState = {
  showProfile: boolean;
  showExtensions: boolean;
  mobileOpen: boolean;
  isMobile: boolean;
  sidebarCollapsed: boolean;
  setShowProfile: (v: boolean) => void;
  setShowExtensions: (v: boolean) => void;
  setMobileOpen: (v: boolean) => void;
  setIsMobile: (v: boolean) => void;
  setSidebarCollapsed: (v: boolean) => void;
  toggleProfile: () => void;
  toggleExtensions: () => void;
};

export const useAppLayout = create<LayoutState>(set => ({
  showProfile: false,
  showExtensions: false,
  mobileOpen: false,
  isMobile: false,
  sidebarCollapsed: false,
  
  setShowProfile: showProfile => set({ showProfile }),
  setShowExtensions: showExtensions => set({ showExtensions }),
  setMobileOpen: mobileOpen => set({ mobileOpen }),
  setIsMobile: isMobile => set({ isMobile }),
  setSidebarCollapsed: sidebarCollapsed => set({ sidebarCollapsed }),
  
  toggleProfile: () => set(state => ({ showProfile: !state.showProfile })),
  toggleExtensions: () => set(state => ({ showExtensions: !state.showExtensions })),
}));
