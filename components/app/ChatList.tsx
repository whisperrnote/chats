import { Box, List, ListItem, ListItemAvatar, Avatar, ListItemText, Badge, Typography, InputBase } from '@mui/material';
import { useChats } from '../../store/chats';

export default function ChatList() {
  const { chats, selectChat, selectedChatId, search, setSearch } = useChats();

  return (
    <Box sx={{ width: { xs: 0, md: 320 }, bgcolor: 'background.paper', borderRight: 1, borderColor: 'divider', display: { xs: 'none', md: 'block' }, height: '100vh', overflowY: 'auto' }}>
      <Box sx={{ p: 2 }}>
        <InputBase
          placeholder="Search chats"
          value={search}
          onChange={e => setSearch(e.target.value)}
          sx={{ width: '100%', bgcolor: 'grey.100', borderRadius: 1, px: 2, py: 1 }}
        />
      </Box>
      <List>
        {chats.map(chat => (
          <ListItem
            key={chat.chatId}
            selected={chat.chatId === selectedChatId}
            onClick={() => selectChat(chat.chatId)}
            button
          >
            <ListItemAvatar>
              <Badge color="primary" badgeContent={chat.unreadCount}>
                <Avatar src={chat.avatarUrl || undefined}>{chat.title?.[0]}</Avatar>
              </Badge>
            </ListItemAvatar>
            <ListItemText
              primary={chat.title}
              secondary={chat.lastMessagePreview}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
