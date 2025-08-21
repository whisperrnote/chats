'use client';

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Search } from '@mui/icons-material';
import { motion } from 'framer-motion';

const mockExtensions = [
  { id: '1', name: 'Giphy', description: 'Share GIFs in your conversations.', imageUrl: '/extensions/giphy.png', category: 'Fun' },
  { id: '2', name: 'Todoist', description: 'Manage tasks and projects.', imageUrl: '/extensions/todoist.png', category: 'Productivity' },
  { id: '3', name: 'GitHub', description: 'Get updates from your repositories.', imageUrl: '/extensions/github.png', category: 'Developer Tools' },
  { id: '4', name: 'Stripe', description: 'Send and receive payments.', imageUrl: '/extensions/stripe.png', category: 'Finance' },
  { id: '5', name: 'Zoom', description: 'Start and join video meetings.', imageUrl: '/extensions/zoom.png', category: 'Communication' },
  { id: '6', name: 'Figma', description: 'Collaborate on designs.', imageUrl: '/extensions/figma.png', category: 'Design' },
];

const ExtensionCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  borderRadius: (theme.shape.borderRadius as number) * 2,
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

export default function ExtensionsPanel() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ padding: 16, height: '100%' }}
    >
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search extensions..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="action" />
              </InputAdornment>
            ),
            sx: {
              borderRadius: 8,
            }
          }}
        />
      </Box>
      <Grid container spacing={2}>
        {mockExtensions.map((ext, index) => (
          <Grid xs={6} key={ext.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <ExtensionCard>
                <CardMedia
                  component="img"
                  height="100"
                  image={ext.imageUrl}
                  alt={ext.name}
                  sx={{ objectFit: 'contain', p: 2 }}
                />
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {ext.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {ext.description}
                  </Typography>
                </CardContent>
              </ExtensionCard>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </motion.div>
  );
}
