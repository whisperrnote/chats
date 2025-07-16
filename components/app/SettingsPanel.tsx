'use client';
import { Box, Typography, Divider, Switch, FormControlLabel, Button, Stack } from '@mui/material';
import { Rnd } from 'react-rnd';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';
import { useEffect, useState } from 'react';

export default function SettingsPanel() {
  // SSR-safe default for Rnd
  const [rndDefault, setRndDefault] = useState({ x: 100, y: 160, width: 400, height: 540 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRndDefault({
        x: window.innerWidth - 400,
        y: 160,
        width: 400,
        height: 540,
      });
    }
  }, []);

  return (
    <Rnd
      default={rndDefault}
      minWidth={300}
      minHeight={340}
      bounds="window"
      dragHandleClassName="settings-panel-drag"
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
        <Box className="settings-panel-drag" sx={{ cursor: 'move', mb: 2 }}>
          <Typography variant="h6">Settings</Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="subtitle2" sx={{ mb: 1 }}>Theme</Typography>
        <ThemeSwitcher />
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle2" sx={{ mb: 1 }}>Chat Settings</Typography>
        <FormControlLabel control={<Switch />} label="Show Read Receipts" />
        <FormControlLabel control={<Switch />} label="Enable Typing Indicators" />
        <FormControlLabel control={<Switch />} label="Compact Mode" />
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle2" sx={{ mb: 1 }}>Privacy</Typography>
        <FormControlLabel control={<Switch />} label="Hide Online Status" />
        <FormControlLabel control={<Switch />} label="Block Unknown Contacts" />
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle2" sx={{ mb: 1 }}>Animations</Typography>
        <FormControlLabel control={<Switch />} label="Enable Animations" />
        <FormControlLabel control={<Switch />} label="Maximal Animations" />
        <Divider sx={{ my: 2 }} />
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" color="error">Log Out</Button>
          <Button variant="contained">Save Settings</Button>
        </Stack>
      </Box>
    </Rnd>
  );
}
