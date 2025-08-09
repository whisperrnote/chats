'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { findUserByUsername } from '@/lib/appwrite';
import { Box, ThemeProvider, CssBaseline } from '@mui/material';
import { createAppTheme } from '@/theme/theme';
import PatternBackground from '@/components/ui/PatternBackground';
import ProfileHeader from './components/ProfileHeader';
import ProfileActions from './components/ProfileActions';
import ProfileSections from './components/ProfileSections';
import ProfileSkeleton from './ProfileSkeleton';
import { capitalize } from '@/utils/stringUtils';

// Helper: fallback color from username hash
function getColorFromString(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  const color = `hsl(${hash % 360}, 70%, 60%)`;
  return color;
}

export default function UserProfilePage() {
  const { username } = useParams();
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const theme = createAppTheme('light');

  useEffect(() => {
    if (username) {
      setLoading(true);
      findUserByUsername(username as string)
        .then(u => { 
          setUser(u); 
          setError(!u ? 'User not found' : null);
        })
        .catch(() => setError('Failed to load user'))
        .finally(() => setLoading(false));
    }
  }, [username]);

  const handleAction = (action: string) => {
    console.log('Profile action:', action);
    // TODO: Implement action handlers
  };

  if (error) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PatternBackground>
          <Box sx={{ 
            p: 4, 
            color: 'error.main', 
            textAlign: 'center',
            maxWidth: 600,
            mx: 'auto',
            mt: 6,
          }}>
            {error}
          </Box>
        </PatternBackground>
      </ThemeProvider>
    );
  }

  if (loading || !user) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PatternBackground>
          <ProfileSkeleton />
        </PatternBackground>
      </ThemeProvider>
    );
  }

  // Prepare data for components
  const initials = (user.displayName || user.username || '?')
    .split(' ')
    .map((s: string) => s[0]?.toUpperCase())
    .join('')
    .slice(0, 2);
  const avatarBg = user.avatarUrl ? undefined : getColorFromString(user.username || '');
  const contrastColor = avatarBg ? theme.palette.getContrastText?.(avatarBg) || '#fff' : undefined;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PatternBackground>
        <Box sx={{
          maxWidth: 600,
          mx: 'auto',
          mt: { xs: 0, sm: 6 },
          borderRadius: 4,
          boxShadow: { xs: 'none', sm: '0 8px 32px rgba(0,0,0,0.08)' },
          bgcolor: { xs: 'transparent', sm: 'background.paper' },
          overflow: 'hidden',
        }}>
          <ProfileHeader 
            user={user}
            avatarBg={avatarBg}
            contrastColor={contrastColor}
            initials={initials}
          />
          
          <ProfileActions 
            user={user}
            onAction={handleAction}
          />
          
          <ProfileSections user={user} />
        </Box>
      </PatternBackground>
    </ThemeProvider>
  );
}
