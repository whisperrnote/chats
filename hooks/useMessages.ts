import { useState } from 'react';

export function useMessages(chatId?: string) {
  const [messages, setMessages] = useState([]);

  return {
    messages,
    sendMessage: (content: string) => {/* TODO: implement send message */},
    loading: false,
    error: null,
  };
}
