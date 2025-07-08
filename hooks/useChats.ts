import { useState } from 'react';

export function useChats() {
  const [chats, setChats] = useState([]);

  return {
    chats,
    selectChat: (chatId: string) => {/* TODO: implement select chat */},
    createChat: () => {/* TODO: implement create chat */},
    loading: false,
    error: null,
  };
}
