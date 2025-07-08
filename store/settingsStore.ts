import { create } from 'zustand';

interface SettingsState {
  settings: any;
  setSettings: (settings: any) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: {},
  setSettings: (settings) => set({ settings }),
}));
