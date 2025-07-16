import { Box, Typography, Paper } from '@mui/material';
import ChatList from '@/components/app/ChatList';
import ChatWindow from '@/components/app/ChatWindow';

// Demo data for preview
const demoChats = [
  {
    chatId: 'demo1',
    title: 'Demo Group',
    avatarUrl: '',
    unreadCount: 2,
    lastMessagePreview: 'Welcome to the demo chat!',
  },
  {
    chatId: 'demo2',
    title: 'Alice',
    avatarUrl: '',
    unreadCount: 0,
    lastMessagePreview: 'Hey, how are you?',
  },
];

const demoMessages = [
  {
    messageId: 'm1',
    content: 'Hello! 👋',
    senderId: { displayName: 'Alice', username: 'alice' },
  },
  {
    messageId: 'm2',
    content: 'Welcome to Whisperrchat demo.',
    senderId: { displayName: 'DemoBot', username: 'demobot' },
  },
];

export default function DemoWidget() {
  // You may want to mock Zustand stores or pass demo data as props to ChatList/ChatWindow for preview
  return (
    <Box sx={{ my: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Chat Application Preview
      </Typography>
      <Paper elevation={6} sx={{ p: 3, borderRadius: 4, maxWidth: 900, width: '100%', display: 'flex', gap: 4 }}>
        <Box sx={{ width: 280 }}>
          {/* Replace with a ChatList demo component if needed */}
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
            Chats
          </Typography>
          {demoChats.map(chat => (
            <Box key={chat.chatId} sx={{ mb: 2, p: 1, bgcolor: 'background.paper', borderRadius: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>{chat.title}</Typography>
              <Typography variant="body2" color="text.secondary">{chat.lastMessagePreview}</Typography>
            </Box>
          ))}
        </Box>
        <Box sx={{ flex: 1 }}>
          {/* Replace with a ChatWindow demo component if needed */}
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
            Conversation
          </Typography>
          {demoMessages.map(msg => (
            <Box key={msg.messageId} sx={{ mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
              <Typography variant="body2" color="text.secondary">{msg.senderId.displayName}</Typography>
              <Typography variant="body1">{msg.content}</Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
}
