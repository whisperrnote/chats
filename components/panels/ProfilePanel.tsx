'use client';

import {
  Avatar,
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Edit,
  Person,
  Mail,
  Phone,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// import { useAuth } from '@/store/auth'; // Will use later

const ProfilePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  margin: theme.spacing(2, 0),
}));

const InfoRow = ({ icon, label, value }) => (
  <Stack direction="row" spacing={2} alignItems="center" sx={{ py: 1.5 }}>
    {icon}
    <Box>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1" fontWeight={500}>
        {value}
      </Typography>
    </Box>
  </Stack>
);

export default function ProfilePanel() {
  // const { user } = useAuth(); // Will use later
  const user = {
    displayName: 'John Smith',
    username: 'johnsmith',
    avatarUrl: '/avatars/2.png',
    bio: 'Frontend developer and coffee enthusiast. Building beautiful and functional web experiences.',
    email: 'john.smith@example.com',
    phone: '+1 234 567 890',
  };

  if (!user) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Loading profile...</Typography>
      </Box>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ padding: 16 }}
    >
      <Stack direction="column" alignItems="center" spacing={2} sx={{ mb: 3 }}>
        <Avatar
          src={user.avatarUrl}
          alt={user.displayName}
          sx={{ width: 100, height: 100, border: '4px solid', borderColor: 'primary.main' }}
        />
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5" fontWeight={600}>
            {user.displayName}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            @{user.username}
          </Typography>
        </Box>
        <Button variant="outlined" startIcon={<Edit />}>
          Edit Profile
        </Button>
      </Stack>

      <ProfilePaper elevation={0} variant="outlined">
        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
          About
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.bio}
        </Typography>
      </ProfilePaper>

      <ProfilePaper elevation={0} variant="outlined">
        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
          Contact Information
        </Typography>
        <Divider />
        <InfoRow icon={<Mail color="action" />} label="Email" value={user.email} />
        <Divider />
        <InfoRow icon={<Phone color="action" />} label="Phone" value={user.phone} />
      </ProfilePaper>
    </motion.div>
  );
}
