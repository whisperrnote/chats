import { Box, IconButton, Stack } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ExtensionIcon from '@mui/icons-material/Extension';
import { useAppLayout } from '../../store/layout';

export default function Sidebar() {
  const { setShowProfile, setShowExtensions } = useAppLayout();

  return (
    <Box sx={{ width: { xs: 56, md: 72 }, bgcolor: 'background.paper', p: 1, borderRight: 1, borderColor: 'divider', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <IconButton onClick={() => setShowProfile(true)}><AccountCircleIcon /></IconButton>
      <IconButton><SettingsIcon /></IconButton>
      <IconButton onClick={() => setShowExtensions(true)}><ExtensionIcon /></IconButton>
    </Box>
  );
}
