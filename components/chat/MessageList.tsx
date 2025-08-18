'use client';

import { useRef, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AnimatePresence } from 'framer-motion';

import MessageItem from './MessageItem';
// import { useMessages } from '@/store/messages'; // Will use this later

const mockMessages = [
  { id: '1', content: 'Hey, check out the new mockups!', timestamp: '2023-10-27T10:42:00Z', sender: { name: 'Jane Doe', avatarUrl: '/avatars/1.png' } },
  { id: '2', content: 'Wow, they look great! 🔥', timestamp: '2023-10-27T10:42:30Z', sender: { name: 'John Smith', avatarUrl: '/avatars/2.png' } },
  { id: '3', content: 'I\'ve pushed the latest changes.', timestamp: '2023-10-27T10:30:00Z', sender: { name: 'You', avatarUrl: '/avatars/0.png' } },
  { id: '4', content: 'Let\'s sync up at 3 PM today.', timestamp: '2023-10-27T09:15:00Z', sender: { name: 'Alice Johnson', avatarUrl: '/avatars/4.png' } },
  { id: '5', content: '👍', timestamp: '2023-10-27T09:15:30Z', sender: { name: 'You', avatarUrl: '/avatars/0.png' } },
];

const MessagesContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  padding: theme.spacing(3),
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.divider,
    borderRadius: '4px',
  },
}));

export default function MessageList({ chat }) {
  // const { messages, isLoading, error } = useMessages(chat?.id); // Will use later
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [mockMessages]); // Dependency will be `messages` later

  if (!chat) {
    return (
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Select a chat to view messages
        </Typography>
      </Box>
    );
  }

  return (
    <MessagesContainer ref={scrollRef}>
      <AnimatePresence>
        {mockMessages.map(message => (
          <MessageItem
            key={message.id}
            message={message}
            isSender={message.sender.name === 'You'}
          />
        ))}
      </AnimatePresence>
    </MessagesContainer>
  );
}
