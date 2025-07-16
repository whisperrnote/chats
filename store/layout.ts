import { create } from 'zustand';

type LayoutState = {
  showProfile: boolean;
  showExtensions: boolean;
  mobileOpen: boolean;
  setShowProfile: (v: boolean) => void;
  setShowExtensions: (v: boolean) => void;
  setMobileOpen: (v: boolean) => void;
};

export const useAppLayout = create<LayoutState>(set => ({
  showProfile: false,
  showExtensions: false,
  mobileOpen: false,
  setShowProfile: showProfile => set({ showProfile }),
  setShowExtensions: showExtensions => set({ showExtensions }),
  setMobileOpen: mobileOpen => set({ mobileOpen }),
}));
