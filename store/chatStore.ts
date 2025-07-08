import { create } from 'zustand';

interface ChatState {
  chats: any[];
  activeChatId: string | null;
  setChats: (chats: any[]) => void;
  setActiveChatId: (id: string | null) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  chats: [],
  activeChatId: null,
  setChats: (chats) => set({ chats }),
  setActiveChatId: (id) => set({ activeChatId: id }),
}));
