'use client';

import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const mockChat = {
  id: '1',
  title: 'Design Team',
  avatarUrl: '/avatars/1.png',
  members: 12,
};

const ChatContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  backgroundColor: theme.palette.background.default,
}));

export default function ChatWindow() {
  const handleSend = (message) => {
    console.log('Sending message:', message);
    // TODO: Implement message sending logic
  };

  return (
    <ChatContainer data-testid="chat-window">
      <ChatHeader chat={mockChat} />
      <MessageList chat={mockChat} />
      <MessageInput onSend={handleSend} />
    </ChatContainer>
  );
}
