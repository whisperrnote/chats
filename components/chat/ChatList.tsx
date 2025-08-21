'use client';

import { useState } from 'react';
import {
  Box,
  List,
  TextField,
  InputAdornment,
  Typography,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { AnimatePresence, motion } from 'framer-motion';

import ChatItem from './ChatItem';
// import { useChats } from '@/store/chats'; // Will use this later

const mockChats = [
  { id: '1', title: 'Design Team', lastMessage: 'Hey, check out the new mockups!', timestamp: '10:42 AM', unreadCount: 3, avatarUrl: '/avatars/1.png' },
  { id: '2', title: 'Frontend Devs', lastMessage: 'I\'ve pushed the latest changes.', timestamp: '10:30 AM', unreadCount: 0, avatarUrl: '/avatars/2.png' },
  { id: '3', title: 'Project Mercury', lastMessage: 'Let\'s sync up at 3 PM today.', timestamp: '9:15 AM', unreadCount: 1, avatarUrl: '/avatars/3.png' },
  { id: '4', title: 'Alice Johnson', lastMessage: 'See you tomorrow!', timestamp: 'Yesterday', unreadCount: 0, avatarUrl: '/avatars/4.png' },
  { id: '5', title: 'Bob Williams', lastMessage: 'Thanks for the help!', timestamp: 'Yesterday', unreadCount: 0, avatarUrl: '/avatars/5.png' },
  { id: '6', title: 'Random Stuff', lastMessage: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', timestamp: '2 days ago', unreadCount: 0, avatarUrl: '/avatars/6.png' },
];

export default function ChatList() {
  // const { chats, isLoading, error } = useChats(); // Will use this later
  const [selectedChat, setSelectedChat] = useState('1');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelectChat = (chatId: string) => {
    setSelectedChat(chatId);
    // TODO: Add logic to open the chat window
  };

  const filteredChats = mockChats.filter(chat =>
    chat.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search chats..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="action" />
              </InputAdornment>
            ),
            sx: {
              borderRadius: 8,
            }
          }}
        />
      </Box>
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <Box
          component={motion.div}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05,
              },
            },
          }}
          initial="hidden"
          animate="visible"
          sx={{ flex: 1, overflowY: 'auto' }}
        >
          <List>
            <AnimatePresence>
              {filteredChats.map(chat => (
                <ChatItem
                  key={chat.id}
                  chat={chat}
                  selected={selectedChat === chat.id}
                  onClick={() => handleSelectChat(chat.id)}
                />
              ))}
            </AnimatePresence>
          </List>
        </Box>
        {filteredChats.length === 0 && (
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4 }}>
            No chats found.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
