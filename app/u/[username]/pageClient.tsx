'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { findUserByUsername } from '@/lib/appwrite';
import { Box, Typography, Avatar, Button } from '@mui/material';

export default function UserProfilePage() {
  const { username } = useParams();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (username) {
      findUserByUsername(username as string).then(setUser);
    }
  }, [username]);

  if (!user) return <Box sx={{ p: 4 }}>Loading...</Box>;

  return (
    <Box sx={{ p: 4, maxWidth: 480, mx: 'auto', textAlign: 'center' }}>
      <Avatar src={user.avatarUrl || undefined} sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }} />
      <Typography variant="h5">{user.displayName || user.username}</Typography>
      <Typography variant="body2" color="text.secondary">{user.bio}</Typography>
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" sx={{ mr: 2 }}>Message</Button>
        <Button variant="outlined" onClick={() => navigator.clipboard.writeText(user.username)}>Copy Username</Button>
      </Box>
      {/* Add QR code and more info as needed */}
    </Box>
  );
}
