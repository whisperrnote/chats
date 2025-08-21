'use client';
import React, { useState } from 'react';
import {
  Button,
  CircularProgress,
  TextField,
  Typography,
  Box,
  Card,
  Container,
} from '@mui/material';
import { useAuth } from '@/hooks/useAuth';
import { useSnackbar } from '@/components/providers/SnackbarProvider';

export default function SetUsername() {
  const [username, setUsername] = useState('');
  const { updateUsername, isLoading, error } = useAuth();
  const snackbar = useSnackbar();

  const handleSetUsername = async () => {
    try {
      await updateUsername(username);
      snackbar.show('Username set successfully!', 'success');
      // The page logic will redirect the user to /app
    } catch (e: any) {
      snackbar.show(e.message || 'An error occurred.', 'error');
    }
  };

  return (
    <Container maxWidth="xs">
      <Card sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Choose your username
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          This will be your unique handle in the app. You can change it later.
        </Typography>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          autoFocus
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          fullWidth
          onClick={handleSetUsername}
          disabled={isLoading || !username}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Save and Continue'}
        </Button>
        {error && (
          <Typography color="error" align="center" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Card>
    </Container>
  );
}
