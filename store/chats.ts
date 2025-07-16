import { create } from 'zustand';
import { Chats } from '../types/appwrite.d';

type ChatState = {
  chats: Chats[];
  selectedChatId: string | null;
  selectedChat: Chats | null;
  search: string;
  setSearch: (v: string) => void;
  selectChat: (id: string) => void;
  setChats: (chats: Chats[]) => void;
};

export const useChats = create<ChatState>((set, get) => ({
  chats: [],
  selectedChatId: null,
  selectedChat: null,
  search: '',
  setSearch: search => set({ search }),
  selectChat: id => {
    const chat = get().chats.find(c => c.chatId === id) || null;
    set({ selectedChatId: id, selectedChat: chat });
  },
  setChats: chats => set({ chats }),
}));
