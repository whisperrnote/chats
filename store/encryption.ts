import { create } from 'zustand';

type EncryptionState = {
  encryptionKey: string | null;
  publicKey: string | null;
  privateKey: string | null;
  isUnlocked: boolean;
  setEncryptionKey: (key: string | null) => void;
  setKeyPair: (publicKey: string, privateKey: string) => void;
  clearKeys: () => void;
};

export const useEncryption = create<EncryptionState>((set) => ({
  encryptionKey: null,
  publicKey: null,
  privateKey: null,
  isUnlocked: false,
  
  setEncryptionKey: (encryptionKey) => set({ 
    encryptionKey,
    isUnlocked: !!encryptionKey 
  }),
  
  setKeyPair: (publicKey, privateKey) => set({ 
    publicKey, 
    privateKey 
  }),
  
  clearKeys: () => set({ 
    encryptionKey: null,
    publicKey: null,
    privateKey: null,
    isUnlocked: false 
  }),
}));
