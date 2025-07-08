import { create } from 'zustand';

interface ExtensionState {
  extensions: any[];
  setExtensions: (extensions: any[]) => void;
}

export const useExtensionStore = create<ExtensionState>((set) => ({
  extensions: [],
  setExtensions: (extensions) => set({ extensions }),
}));
