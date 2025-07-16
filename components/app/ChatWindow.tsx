'use client';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useChats } from '@/store/chats';
import { listMessages } from '@/lib/appwrite';
import { decryptMessage } from '@/lib/encryption'; // implement this
import { useEncryptionKey } from '@/store/encryption'; // zustand store for session key

export default function ChatWindow() {
  const { selectedChatId } = useChats();
  const [messages, setMessages] = useState<any[]>([]);
  const { encryptionKey } = useEncryptionKey();

  useEffect(() => {
    if (selectedChatId && encryptionKey) {
      listMessages(selectedChatId).then(async res => {
        const decrypted = await Promise.all(
          res.documents.map(async (msg: any) => ({
            ...msg,
            content: await decryptMessage(msg.content, encryptionKey)
          }))
        );
        setMessages(decrypted);
      });
    }
  }, [selectedChatId, encryptionKey]);

  if (!selectedChatId) return <Box sx={{ p: 4 }}>Select a chat to start messaging.</Box>;

  return (
    <Box sx={{ p: 4 }}>
      {messages.map(msg => (
        <Box key={msg.$id} sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">{msg.senderId?.displayName || msg.senderId?.username}</Typography>
          <Typography variant="body1">{msg.content}</Typography>
        </Box>
      ))}
    </Box>
  );
}
