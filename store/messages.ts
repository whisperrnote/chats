import { create } from 'zustand';
import { Messages } from '../types/appwrite.d';

type MessageState = {
  messages: Messages[];
  sendMessage: (content: string) => void;
  setMessages: (messages: Messages[]) => void;
};

export const useMessages = (chatId: string) =>
  create<MessageState>((set, get) => ({
    messages: [],
    sendMessage: content => {
      // Implement sending logic here, e.g. call Appwrite API
      // After sending, update messages
    },
    setMessages: messages => set({ messages }),
  }))();
