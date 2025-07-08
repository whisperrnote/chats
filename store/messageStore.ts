import { create } from 'zustand';

interface MessageState {
  messages: any[];
  setMessages: (messages: any[]) => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  messages: [],
  setMessages: (messages) => set({ messages }),
}));
