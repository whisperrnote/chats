import { Box, Typography, Chip, Stack } from '@mui/material';
import { Verified, Shield } from '@mui/icons-material';
import Avatar from '@/components/ui/Avatar';
import { capitalize } from '@/utils/stringUtils';

interface ProfileHeaderProps {
  user: any;
  avatarBg?: string;
  contrastColor?: string;
  initials: string;
}

export default function ProfileHeader({ user, avatarBg, contrastColor, initials }: ProfileHeaderProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'success';
      case 'away': return 'warning';
      case 'busy': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'Online';
      case 'away': return 'Away';
      case 'busy': return 'Busy';
      default: return 'Offline';
    }
  };

  return (
    <Box>
      {/* Cover/Banner Area */}
      <Box sx={{
        height: { xs: 140, sm: 180 },
        width: '100%',
        position: 'relative',
        background: avatarBg ? `linear-gradient(135deg, ${avatarBg}15, ${avatarBg}30)` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: { xs: 0, sm: '16px 16px 0 0' },
        overflow: 'hidden',
      }}>
        {/* Subtle pattern overlay */}
        <Box sx={{
          position: 'absolute',
          inset: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }} />
        
        {/* Avatar positioned at bottom */}
        <Box sx={{
          position: 'absolute',
          bottom: -40,
          left: { xs: '50%', sm: 32 },
          transform: { xs: 'translateX(-50%)', sm: 'none' },
        }}>
          <Box sx={{ 
            position: 'relative',
            border: '4px solid white',
            borderRadius: '50%',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            bgcolor: avatarBg,
          }}>
            <Avatar
              src={user.avatarUrl}
              alt={user.displayName || user.username}
              size={80}
            />
            {!user.avatarUrl && (
              <Box sx={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                fontWeight: 700,
                color: contrastColor,
                borderRadius: '50%',
              }}>
                {initials}
              </Box>
            )}
            
            {/* Online status indicator */}
            {user.status === 'online' && (
              <Box sx={{
                position: 'absolute',
                bottom: 4,
                right: 4,
                width: 20,
                height: 20,
                bgcolor: 'success.main',
                borderRadius: '50%',
                border: '3px solid white',
              }} />
            )}
          </Box>
        </Box>
      </Box>

      {/* Profile Info */}
      <Box sx={{ 
        pt: 6, 
        px: { xs: 2, sm: 4 }, 
        pb: 3,
        textAlign: { xs: 'center', sm: 'left' },
        ml: { xs: 0, sm: 7 }, // Offset for avatar on desktop
      }}>
        <Stack direction="row" alignItems="center" justifyContent={{ xs: 'center', sm: 'flex-start' }} spacing={1} sx={{ mb: 1 }}>
          <Typography variant="h4" fontWeight={700} sx={{ fontSize: { xs: '1.75rem', sm: '2rem' } }}>
            {user.displayName || capitalize(user.username)}
          </Typography>
          {user.verified && (
            <Verified sx={{ color: 'primary.main', fontSize: 24 }} />
          )}
          {user.premium && (
            <Shield sx={{ color: 'warning.main', fontSize: 24 }} />
          )}
        </Stack>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: '0.95rem' }}>
          @{user.username}
        </Typography>

        {user.bio && (
          <Typography variant="body1" sx={{ mb: 2, maxWidth: 400, lineHeight: 1.6 }}>
            {user.bio}
          </Typography>
        )}

        {/* Status and metadata chips */}
        <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent={{ xs: 'center', sm: 'flex-start' }}>
          <Chip
            label={getStatusText(user.status || 'offline')}
            color={getStatusColor(user.status || 'offline') as any}
            size="small"
            variant="outlined"
          />
          {user.location && (
            <Chip
              label={user.location}
              size="small"
              variant="outlined"
            />
          )}
          {user.joinedDate && (
            <Chip
              label={`Joined ${new Date(user.joinedDate).getFullYear()}`}
              size="small"
              variant="outlined"
            />
          )}
        </Stack>
      </Box>
    </Box>
  );
}