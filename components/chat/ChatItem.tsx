'use client';

import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { motion } from 'framer-motion';

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: (theme.shape.borderRadius as number) * 2,
  margin: theme.spacing(0.5, 1),
  '&.Mui-selected': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.15),
    },
  },
}));

const TruncatedTypography = styled(Typography)({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

interface ChatItemProps {
  chat: {
    title: string;
    lastMessage: string;
    timestamp: string;
    unreadCount: number;
    avatarUrl?: string;
  };
  selected: boolean;
  onClick: () => void;
}

export default function ChatItem({ chat, selected, onClick }: ChatItemProps) {
  const { title, lastMessage, timestamp, unreadCount } = chat;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ListItem disablePadding>
        <StyledListItemButton selected={selected} onClick={onClick}>
          <ListItemAvatar>
            <Avatar alt={title} src={chat.avatarUrl}>
              {title?.[0]}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <TruncatedTypography variant="subtitle1" fontWeight={500}>
                {title}
              </TruncatedTypography>
            }
            secondary={
              <TruncatedTypography variant="body2" color="text.secondary">
                {lastMessage}
              </TruncatedTypography>
            }
          />
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            marginLeft: 1,
          }}>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>
              {timestamp}
            </Typography>
            {unreadCount > 0 && (
              <Box sx={{
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                borderRadius: '50%',
                width: 20,
                height: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 'bold',
              }}>
                {unreadCount}
              </Box>
            )}
          </Box>
        </StyledListItemButton>
      </ListItem>
    </motion.div>
  );
}
