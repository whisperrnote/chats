import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useMessages } from '../../store/messages';

export default function MessageList({ chatId }: { chatId: string }) {
  const { messages } = useMessages(chatId);

  return (
    <Box sx={{ flex: 1, overflowY: 'auto', px: 2, py: 1 }}>
      <List>
        {messages.map(msg => (
          <ListItem key={msg.messageId} alignItems="flex-start">
            <ListItemText
              primary={<Typography variant="body1">{msg.content}</Typography>}
              secondary={msg.senderId?.displayName || msg.senderId?.username}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
