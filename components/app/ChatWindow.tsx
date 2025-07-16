import { Box, Typography } from '@mui/material';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useChats } from '../../store/chats';

export default function ChatWindow() {
  const { selectedChat } = useChats();

  if (!selectedChat) {
    return (
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" color="text.secondary">Select a chat to start messaging</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <MessageList chatId={selectedChat.chatId} />
      <MessageInput chatId={selectedChat.chatId} />
    </Box>
  );
}
