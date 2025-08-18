'use client';

import {
  AppBar,
  Toolbar,
  Avatar,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import {
  Phone,
  Videocam,
  Info,
  MoreVert,
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.paper, 0.8),
  backdropFilter: 'blur(12px)',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export default function ChatHeader({ chat }) {
  if (!chat) {
    return (
      <StyledToolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Select a chat to start messaging
        </Typography>
      </StyledToolbar>
    );
  }

  const { title, avatarUrl, members } = chat;

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <StyledToolbar>
        <Avatar src={avatarUrl} alt={title} sx={{ mr: 2 }}>{title?.[0]}</Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div" noWrap>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {members ? `${members} members` : '...'}
          </Typography>
        </Box>
        <IconButton color="inherit">
          <Phone />
        </IconButton>
        <IconButton color="inherit">
          <Videocam />
        </IconButton>
        <IconButton color="inherit">
          <Info />
        </IconButton>
        <IconButton color="inherit">
          <MoreVert />
        </IconButton>
      </StyledToolbar>
    </AppBar>
  );
}
