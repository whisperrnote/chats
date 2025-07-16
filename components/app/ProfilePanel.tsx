'use client';
import { Box, Typography, Avatar, Divider, Button, Stack } from '@mui/material';
import { useUser } from '@/store/user';
import { Rnd } from 'react-rnd';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';

export default function ProfilePanel() {
  const { user } = useUser();

  return (
    <Rnd
      default={{
        x: window.innerWidth - 340,
        y: 80,
        width: 340,
        height: 520,
      }}
      minWidth={280}
      minHeight={320}
      bounds="window"
      dragHandleClassName="profile-panel-drag"
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
        <Box className="profile-panel-drag" sx={{ cursor: 'move', mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar src={user?.avatarUrl || undefined} sx={{ width: 64, height: 64 }} />
          <Box>
            <Typography variant="h6">{user?.displayName || user?.username}</Typography>
            <Typography variant="body2" color="text.secondary">{user?.bio}</Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Status: {user?.status || 'offline'}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Credibility: {user?.credibilityTier || 'bronze'} ({user?.credibilityScore ?? 0})
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Email: {user?.email}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Phone: {user?.phone}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Stack direction="row" spacing={2} alignItems="center">
          <ThemeSwitcher />
          <Button variant="outlined" size="small">Edit Profile</Button>
        </Stack>
      </Box>
    </Rnd>
  );
}
