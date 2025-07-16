'use client';
import { Box, List, ListItem, ListItemAvatar, Avatar, ListItemText, Badge, InputBase, Fab, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { useChats } from '@/store/chats';
import { useAppLayout } from '@/store/layout';
import { useState } from 'react';
import { Rnd } from 'react-rnd';

export default function ChatList() {
  const { chats, selectChat, selectedChatId, search, setSearch } = useChats();
  const { setShowExtensions } = useAppLayout();
  const [showAiPanel, setShowAiPanel] = useState(false);

  const handleAiClick = () => {
    setShowExtensions(true); // Open the secondary sidebar for AI chat
    // Optionally, set a state to indicate AI panel is active
  };

  return (
    <Rnd
      default={{
        x: 0,
        y: 0,
        width: 320,
        height: window.innerHeight,
      }}
      minWidth={220}
      minHeight={320}
      bounds="window"
      dragHandleClassName="chatlist-panel-drag"
      style={{ zIndex: 1100, position: 'fixed' }}
      enableResizing={{ right: true, left: false, top: false, bottom: false }}
    >
      <Box sx={{ width: '100%', height: '100%', bgcolor: 'background.paper', borderRight: 1, borderColor: 'divider', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <Box className="chatlist-panel-drag" sx={{ p: 2, cursor: 'move' }}>
          <InputBase
            placeholder="Search chats"
            value={search}
            onChange={e => setSearch(e.target.value)}
            sx={{ width: '100%', bgcolor: 'grey.100', borderRadius: 1, px: 2, py: 1 }}
          />
        </Box>
        <List sx={{ flex: 1, overflowY: 'auto' }}>
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
        {/* Floating Action Buttons */}
        <Box sx={{ position: 'absolute', bottom: 24, right: 24, display: 'flex', flexDirection: 'column', gap: 2, zIndex: 1201 }}>
          <Tooltip title="New Group/Channel" placement="left">
            <Fab
              color="primary"
              aria-label="add"
              sx={{
                boxShadow: '0 4px 16px 0 rgba(124,77,30,0.18)',
                background: 'linear-gradient(135deg, #b7e6c8 0%, #b97a56 100%)',
                color: '#fff',
                mb: 1,
                '&:hover': {
                  background: 'linear-gradient(135deg, #a86b32 0%, #4ECDC4 100%)',
                },
              }}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
          <Tooltip title="AI Chat" placement="left">
            <Fab
              aria-label="AI Chat"
              onClick={handleAiClick}
              sx={{
                boxShadow: '0 4px 16px 0 rgba(78,205,196,0.18)',
                background: 'linear-gradient(135deg, #4ECDC4 0%, #b97a56 100%)',
                color: '#fff',
                '&:hover': {
                  background: 'linear-gradient(135deg, #b7e6c8 0%, #a86b32 100%)',
                },
              }}
            >
              <SmartToyIcon />
            </Fab>
          </Tooltip>
        </Box>
      </Box>
    </Rnd>
  );
}
