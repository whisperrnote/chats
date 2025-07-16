import { Box, Typography, Avatar } from '@mui/material';
import { useUser } from '../../store/user';

export default function ProfilePanel() {
  const { user } = useUser();

  return (
    <Box sx={{ position: 'fixed', right: 0, top: 0, width: 320, height: '100vh', bgcolor: 'background.paper', boxShadow: 4, p: 3 }}>
      <Avatar src={user.avatarUrl || undefined} sx={{ width: 64, height: 64, mb: 2 }} />
      <Typography variant="h6">{user.displayName || user.username}</Typography>
      <Typography variant="body2" color="text.secondary">{user.bio}</Typography>
      {/* Add more profile info, settings, etc. */}
    </Box>
  );
}
