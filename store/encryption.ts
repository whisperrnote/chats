import { create } from 'zustand';

type EncryptionState = {
  encryptionKey: string | null;
  setEncryptionKey: (key: string | null) => void;
};

export const useEncryptionKey = create<EncryptionState>(set => ({
  encryptionKey: null,
  setEncryptionKey: (encryptionKey) => set({ encryptionKey }),
}));
