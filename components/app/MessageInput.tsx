import { Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import { useMessages } from '../../store/messages';

export default function MessageInput({ chatId }: { chatId: string }) {
  const [value, setValue] = useState('');
  const { sendMessage } = useMessages(chatId);

  const handleSend = () => {
    if (value.trim()) {
      sendMessage(value);
      setValue('');
    }
  };

  return (
    <Box sx={{ display: 'flex', p: 2, borderTop: 1, borderColor: 'divider' }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type a message"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSend()}
      />
      <IconButton color="primary" onClick={handleSend} sx={{ ml: 1 }}>
        <SendIcon />
      </IconButton>
    </Box>
  );
}
