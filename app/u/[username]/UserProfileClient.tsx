'use client';
import { Box, Typography, Button, useTheme } from '@mui/material';
import Avatar from '@/components/ui/Avatar';
import { capitalize } from '@/utils/stringUtils';

// Helper: fallback color from username hash
function getColorFromString(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  const color = `hsl(${hash % 360}, 70%, 60%)`;
  return color;
}

export default function UserProfileClient({ user, error }: { user: any, error: string | null }) {
  const theme = useTheme();

  if (error) return <Box sx={{ p: 4, color: 'error.main', textAlign: 'center' }}>{error}</Box>;
  if (!user) return <Box sx={{ p: 4, textAlign: 'center' }}>Loading…</Box>;

  // Fallback initials
  const initials = (user.displayName || user.username || '?')
    .split(' ')
    .map((s: string) => s[0]?.toUpperCase())
    .join('')
    .slice(0, 2);
  const avatarBg = user.avatarUrl ? undefined : getColorFromString(user.username || '');
  const contrastColor = avatarBg ? theme.palette.getContrastText?.(avatarBg) || '#fff' : undefined;

  return (
    <Box sx={{
      p: { xs: 0, sm: 4 },
      maxWidth: 480,
      mx: 'auto',
      mt: { xs: 0, sm: 6 },
      borderRadius: 4,
      boxShadow: { xs: 'none', sm: 3 },
      bgcolor: { xs: 'transparent', sm: 'background.paper' },
      overflow: 'hidden',
    }}>
      {/* Banner */}
      <Box sx={{
        height: 120,
        width: '100%',
        bgcolor: avatarBg,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        position: 'relative',
      }}>
        <Box sx={{
          position: 'absolute',
          left: 0, right: 0, top: 0, bottom: 0,
          opacity: 0.15,
          background: `repeating-linear-gradient(135deg, ${avatarBg}, ${avatarBg} 20px, transparent 20px, transparent 40px)`
        }} />
        <Box sx={{ position: 'absolute', left: 0, right: 0, bottom: -40, display: 'flex', justifyContent: 'center' }}>
          <Avatar
            src={user.avatarUrl}
            alt={user.displayName || user.username}
            size={80}
          />
          {!user.avatarUrl && (
            <Box sx={{
              position: 'absolute',
              left: 0, right: 0, bottom: 8, textAlign: 'center', width: '100%', pointerEvents: 'none',
              fontSize: 32, fontWeight: 700, color: contrastColor, background: avatarBg, borderRadius: '50%', height: 80, lineHeight: '80px', border: '3px solid #fff', boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
            }}>{initials}</Box>
          )}
        </Box>
      </Box>
      <Box sx={{ pt: 7, pb: 2, textAlign: 'center' }}>
        <Typography variant="h5" fontWeight={700}>{user.displayName || capitalize(user.username)}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{user.bio || 'No bio yet.'}</Typography>
        <Typography variant="caption" color="text.disabled" sx={{ mt: 0.5, display: 'block' }}>@{user.username}</Typography>
      </Box>
      {/* Action Buttons */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', mb: 2 }}>
        <Button variant="contained" color="primary">Message</Button>
        <Button variant="outlined" color="primary">Call</Button>
        <Button variant="outlined" color="secondary">Block</Button>
        <Button variant="outlined" color="secondary">Report</Button>
        <Button variant="outlined" color="primary">Add to List</Button>
        <Button variant="outlined" color="primary">Lock Chat</Button>
        <Button variant="outlined" color="primary">Disappearing Msgs</Button>
        <Button variant="outlined" color="primary">Notifications</Button>
        <Button variant="outlined" color="primary">Gift Premium</Button>
        <Button variant="outlined" color="primary" onClick={() => navigator.clipboard.writeText(user.username)}>Copy Username</Button>
      </Box>
      {/* Status, Media, and More */}
      <Box sx={{ mt: 2, textAlign: 'left', px: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>Status</Typography>
        <Typography variant="body2" color={user.status === 'online' ? 'success.main' : 'text.secondary'}>
          {user.status === 'online' ? 'Online' : user.status === 'away' ? 'Away' : 'Offline'}
        </Typography>
        <Typography variant="subtitle2" sx={{ mt: 2, mb: 0.5 }}>Media</Typography>
        <Typography variant="body2" color="text.secondary">(Media gallery coming soon)</Typography>
        <Typography variant="subtitle2" sx={{ mt: 2, mb: 0.5 }}>Moderation</Typography>
        <Typography variant="body2" color="text.secondary">(Moderation/report features coming soon)</Typography>
      </Box>
    </Box>
  );
}
