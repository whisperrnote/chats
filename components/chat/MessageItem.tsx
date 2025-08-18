'use client';

import {
  Avatar,
  Box,
  Typography,
  Paper,
  Stack,
  IconButton,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { TagFaces, Reply } from '@mui/icons-material';

const MessageContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isSender',
})(({ theme, isSender }) => ({
  display: 'flex',
  flexDirection: isSender ? 'row-reverse' : 'row',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(2),
  gap: theme.spacing(1),
}));

const MessageBubble = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'isSender',
})(({ theme, isSender }) => ({
  padding: theme.spacing(1.5, 2),
  borderRadius: isSender
    ? '20px 20px 4px 20px'
    : '20px 20px 20px 4px',
  backgroundColor: isSender
    ? theme.palette.primary.main
    : theme.palette.background.paper,
  color: isSender
    ? theme.palette.primary.contrastText
    : theme.palette.text.primary,
  maxWidth: '70%',
  wordWrap: 'break-word',
  boxShadow: theme.shadows[1],
}));

const MessageMeta = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(0.5),
}));

const HoverControls = styled(Box)({
  display: 'none',
  '*:hover > &': {
    display: 'flex',
  },
});

export default function MessageItem({ message, isSender }) {
  const { content, timestamp, sender, reactions, replyTo } = message;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <MessageContainer isSender={isSender}>
        <Avatar
          sx={{ width: 32, height: 32 }}
          src={sender.avatarUrl}
          alt={sender.name}
        >
          {sender.name?.[0]}
        </Avatar>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <MessageBubble isSender={isSender}>
              <Typography variant="body1">{content}</Typography>
            </MessageBubble>
            <HoverControls>
              <IconButton size="small"><TagFaces fontSize="small" /></IconButton>
              <IconButton size="small"><Reply fontSize="small" /></IconButton>
            </HoverControls>
          </Box>
          <MessageMeta sx={{ textAlign: isSender ? 'right' : 'left' }}>
            {sender.name}, {format(new Date(timestamp), 'p')}
          </MessageMeta>
        </Box>
      </MessageContainer>
    </motion.div>
  );
}
