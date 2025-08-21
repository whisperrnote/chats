'use client';

import { useState } from 'react';
import {
  Box,
  IconButton,
  TextField,
  InputAdornment,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  Add,
  Mic,
  Send,
  TagFaces,
} from '@mui/icons-material';

const InputContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  backgroundColor: alpha(theme.palette.background.paper, 0.8),
  backdropFilter: 'blur(12px)',
  borderTop: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: (theme.shape.borderRadius as number) * 3,
    backgroundColor: theme.palette.background.default,
    '& fieldset': {
      border: 'none',
    },
    '&:hover fieldset': {
      border: 'none',
    },
    '&.Mui-focused fieldset': {
      border: 'none',
    },
  },
}));

interface MessageInputProps {
  onSend: (message: string) => void;
}

export default function MessageInput({ onSend }: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <InputContainer>
      <IconButton>
        <Add />
      </IconButton>
      <StyledTextField
        fullWidth
        multiline
        maxRows={5}
        variant="outlined"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <TagFaces />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {message ? (
        <IconButton color="primary" onClick={handleSend}>
          <Send />
        </IconButton>
      ) : (
        <IconButton>
          <Mic />
        </IconButton>
      )}
    </InputContainer>
  );
}
