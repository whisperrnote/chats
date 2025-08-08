'use client';
import React, { useState, useEffect } from 'react';
import { Box, Typography, Divider, List, ListItem, ListItemText, Paper, TextField, IconButton } from '@mui/material';
import { Rnd } from 'react-rnd';
import SendIcon from '@mui/icons-material/Send';

const demoExtensions = [
  { name: 'Weather Bot', desc: 'Get weather updates in chat.' },
  { name: 'Crypto Tracker', desc: 'Track crypto prices live.' },
  { name: 'Custom Theme Loader', desc: 'Load user-created themes.' },
];

export default function ExtensionPanel({ isMobile = false }: { isMobile?: boolean }): React.ReactElement | null {
  const [aiMessages, setAiMessages] = useState<{ sender: 'user' | 'ai'; text: string }[]>([]);
  const [input, setInput] = useState('');

  // SSR-safe default for Rnd
  const [rndDefault, setRndDefault] = useState({ x: 100, y: 120, width: 380, height: 480 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRndDefault({
        x: window.innerWidth - 380,
        y: 120,
        width: 380,
        height: 480,
      });
    }
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    setAiMessages([...aiMessages, { sender: 'user', text: input }]);
    setTimeout(() => {
      setAiMessages(msgs => [...msgs, { sender: 'ai', text: "I'm your AI assistant. How can I help?" }]);
    }, 600);
    setInput('');
  };

  if (isMobile) {
    return (
      <Box
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 0,
          boxShadow: 0,
          p: 3,
          height: '100vh',
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box className="extension-panel-drag" sx={{ mb: 2 }}>
          <Typography variant="h6">Extensions Explorer</Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        {/* AI Chat Panel */}
        <Paper
          elevation={3}
          sx={{
            mb: 2,
            p: 2,
            borderRadius: 3,
            background: 'linear-gradient(135deg, #b7e6c8 0%, #b97a56 100%)',
            color: '#3a2a18',
            minHeight: 180,
            maxHeight: 220,
            overflowY: 'auto',
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
            AI Chat
          </Typography>
          <Box sx={{ mb: 1 }}>
            {aiMessages.length === 0 && (
              <Typography variant="body2" color="text.secondary">
                Start a conversation with your AI assistant.
              </Typography>
            )}
            {aiMessages.map((msg, idx) => (
              <Box key={idx} sx={{ mb: 1, textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                <Typography
                  variant="body2"
                  sx={{
                    display: 'inline-block',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    bgcolor: msg.sender === 'user' ? 'primary.light' : 'secondary.light',
                    color: msg.sender === 'user' ? 'primary.contrastText' : 'secondary.contrastText',
                  }}
                >
                  {msg.text}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <TextField
              size="small"
              variant="outlined"
              placeholder="Type a message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              sx={{ flex: 1, bgcolor: 'background.paper', borderRadius: 2 }}
            />
            <IconButton color="primary" onClick={handleSend} sx={{ ml: 1 }}>
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
        <Divider sx={{ mb: 2 }} />
        <List dense>
          {demoExtensions.map((ext, i) => (
            <ListItem key={i}>
              <ListItemText
                primary={ext.name}
                secondary={ext.desc}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    );
  }

  // Desktop: draggable panel
  return (
    <Rnd
      default={rndDefault}
      minWidth={280}
      minHeight={320}
      bounds="window"
      dragHandleClassName="extension-panel-drag"
      style={{ zIndex: 1200, position: 'fixed' }}
    >
      <Box
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 3,
          boxShadow: 8,
          p: 3,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box className="extension-panel-drag" sx={{ mb: 2, cursor: 'move' }}>
          <Typography variant="h6">Extensions Explorer</Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        {/* AI Chat Panel */}
        <Paper
          elevation={3}
          sx={{
            mb: 2,
            p: 2,
            borderRadius: 3,
            background: 'linear-gradient(135deg, #b7e6c8 0%, #b97a56 100%)',
            color: '#3a2a18',
            minHeight: 180,
            maxHeight: 220,
            overflowY: 'auto',
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
            AI Chat
          </Typography>
          <Box sx={{ mb: 1 }}>
            {aiMessages.length === 0 && (
              <Typography variant="body2" color="text.secondary">
                Start a conversation with your AI assistant.
              </Typography>
            )}
            {aiMessages.map((msg, idx) => (
              <Box key={idx} sx={{ mb: 1, textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                <Typography
                  variant="body2"
                  sx={{
                    display: 'inline-block',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    bgcolor: msg.sender === 'user' ? 'primary.light' : 'secondary.light',
                    color: msg.sender === 'user' ? 'primary.contrastText' : 'secondary.contrastText',
                  }}
                >
                  {msg.text}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <TextField
              size="small"
              variant="outlined"
              placeholder="Type a message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              sx={{ flex: 1, bgcolor: 'background.paper', borderRadius: 2 }}
            />
            <IconButton color="primary" onClick={handleSend} sx={{ ml: 1 }}>
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
        <Divider sx={{ mb: 2 }} />
        <List dense>
          {demoExtensions.map((ext, i) => (
            <ListItem key={i}>
              <ListItemText
                primary={ext.name}
                secondary={ext.desc}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Rnd>
  );
}
