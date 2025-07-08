import { create } from 'zustand';

interface ContactState {
  contacts: any[];
  setContacts: (contacts: any[]) => void;
}

export const useContactStore = create<ContactState>((set) => ({
  contacts: [],
  setContacts: (contacts) => set({ contacts }),
}));
