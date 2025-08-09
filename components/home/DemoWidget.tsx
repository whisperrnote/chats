import { Box, Typography, Card, Stack, Avatar, Chip, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { Send, MoreVert, Lock, Verified } from '@mui/icons-material';

// Demo data for preview
const demoChats = [
  {
    chatId: 'demo1',
    name: 'Sarah Johnson',
    avatar: '👩‍💼',
    lastMessage: 'The documents are ready for review',
    time: '2m ago',
    unread: 2,
    verified: true,
  },
  {
    chatId: 'demo2',
    name: 'Design Team',
    avatar: '🎨',
    lastMessage: 'Alex: New mockups uploaded',
    time: '5m ago',
    unread: 0,
    isGroup: true,
  },
  {
    chatId: 'demo3',
    name: 'Michael Chen',
    avatar: '👨‍💻',
    lastMessage: 'Perfect, let\'s ship it! 🚀',
    time: '1h ago',
    unread: 0,
  },
];

const demoMessages = [
  {
    id: 'm1',
    content: 'Hey! How\'s the new project going?',
    sender: 'Sarah Johnson',
    time: '2:30 PM',
    isMine: false,
  },
  {
    id: 'm2',
    content: 'Going great! The team is making excellent progress. We should have the MVP ready by next week.',
    sender: 'You',
    time: '2:32 PM',
    isMine: true,
  },
  {
    id: 'm3',
    content: 'That\'s fantastic news! 🎉',
    sender: 'Sarah Johnson',
    time: '2:33 PM',
    isMine: false,
  },
];

export default function DemoWidget() {
  return (
    <Box 
      sx={{ 
        py: { xs: 6, md: 10 }, 
        px: { xs: 2, md: 4 },
        maxWidth: 1200,
        mx: 'auto',
      }}
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Stack spacing={2} alignItems="center" textAlign="center" sx={{ mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              letterSpacing: '-0.02em',
            }}
          >
            See It In Action
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              maxWidth: 600,
              lineHeight: 1.6,
              fontSize: { xs: '1rem', md: '1.25rem' },
            }}
          >
            Experience the clean, intuitive interface designed for modern communication.
          </Typography>
        </Stack>
      </motion.div>

      {/* Demo Interface */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <Card
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
            border: '1px solid',
            borderColor: 'divider',
            background: 'background.paper',
          }}
        >
          <Box sx={{ display: 'flex', height: { xs: 500, md: 600 } }}>
            {/* Chat List */}
            <Box
              sx={{
                width: { xs: '40%', md: 350 },
                borderRight: '1px solid',
                borderColor: 'divider',
                overflow: 'hidden',
              }}
            >
              {/* Chat List Header */}
              <Box
                sx={{
                  p: 3,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  background: 'background.default',
                }}
              >
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="h6" fontWeight={700}>
                    Chats
                  </Typography>
                  <Chip size="small" label="3" color="primary" />
                </Stack>
              </Box>

              {/* Chat Items */}
              <Box sx={{ overflow: 'auto', height: '100%' }}>
                {demoChats.map((chat, index) => (
                  <motion.div
                    key={chat.chatId}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Box
                      sx={{
                        p: 2,
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        cursor: 'pointer',
                        background: index === 0 ? 'action.selected' : 'transparent',
                        '&:hover': {
                          background: 'action.hover',
                        },
                        transition: 'background 0.2s ease',
                      }}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box sx={{ position: 'relative' }}>
                          <Box
                            sx={{
                              width: 48,
                              height: 48,
                              borderRadius: '50%',
                              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '1.5rem',
                            }}
                          >
                            {chat.avatar}
                          </Box>
                          {index === 0 && (
                            <Box
                              sx={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                width: 14,
                                height: 14,
                                borderRadius: '50%',
                                background: 'success.main',
                                border: '2px solid white',
                              }}
                            />
                          )}
                        </Box>

                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography
                              variant="subtitle2"
                              fontWeight={600}
                              noWrap
                              sx={{ flex: 1 }}
                            >
                              {chat.name}
                            </Typography>
                            {chat.verified && (
                              <Verified sx={{ fontSize: 16, color: 'primary.main' }} />
                            )}
                          </Stack>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            noWrap
                            sx={{ fontSize: '0.85rem' }}
                          >
                            {chat.lastMessage}
                          </Typography>
                        </Box>

                        <Stack alignItems="flex-end" spacing={1}>
                          <Typography variant="caption" color="text.secondary">
                            {chat.time}
                          </Typography>
                          {chat.unread > 0 && (
                            <Box
                              sx={{
                                minWidth: 20,
                                height: 20,
                                borderRadius: '50%',
                                background: 'primary.main',
                                color: 'primary.contrastText',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                              }}
                            >
                              {chat.unread}
                            </Box>
                          )}
                        </Stack>
                      </Stack>
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </Box>

            {/* Chat Window */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              {/* Chat Header */}
              <Box
                sx={{
                  p: 3,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  background: 'background.default',
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.25rem',
                    }}
                  >
                    👩‍💼
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        Sarah Johnson
                      </Typography>
                      <Lock sx={{ fontSize: 16, color: 'success.main' }} />
                    </Stack>
                    <Typography variant="caption" color="success.main">
                      End-to-end encrypted • Online
                    </Typography>
                  </Box>
                  <IconButton>
                    <MoreVert />
                  </IconButton>
                </Stack>
              </Box>

              {/* Messages */}
              <Box sx={{ flex: 1, p: 3, overflow: 'auto' }}>
                <Stack spacing={2}>
                  {demoMessages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.2 }}
                      viewport={{ once: true }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: message.isMine ? 'flex-end' : 'flex-start',
                        }}
                      >
                        <Box
                          sx={{
                            maxWidth: '70%',
                            p: 2,
                            borderRadius: 3,
                            background: message.isMine
                              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                              : 'background.default',
                            color: message.isMine ? 'white' : 'text.primary',
                            border: message.isMine ? 'none' : '1px solid',
                            borderColor: 'divider',
                          }}
                        >
                          <Typography variant="body2">
                            {message.content}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              display: 'block',
                              mt: 0.5,
                              opacity: 0.8,
                              fontSize: '0.75rem',
                            }}
                          >
                            {message.time}
                          </Typography>
                        </Box>
                      </Box>
                    </motion.div>
                  ))}
                </Stack>
              </Box>

              {/* Message Input */}
              <Box
                sx={{
                  p: 3,
                  borderTop: '1px solid',
                  borderColor: 'divider',
                  background: 'background.default',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 1.5,
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    background: 'background.paper',
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ flex: 1, py: 0.5 }}
                  >
                    Type a message...
                  </Typography>
                  <IconButton
                    size="small"
                    sx={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4c93 100%)',
                      },
                    }}
                  >
                    <Send fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Box>
        </Card>
      </motion.div>
    </Box>
  );
}
