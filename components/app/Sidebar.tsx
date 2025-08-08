import { Box, IconButton, Tooltip } from '@mui/material';
import { Home, Settings, Person, Extension } from '@mui/icons-material';
import { useAppLayout } from '@/store/layout';

export default function Sidebar() {
  const { toggleProfile, toggleExtensions, isMobile, setActiveMobileView } = useAppLayout();

  // On mobile, set active view instead of toggling overlays
  const handleProfileClick = () => {
    if (isMobile) setActiveMobileView('profile');
    else toggleProfile();
  };
  const handleExtensionsClick = () => {
    if (isMobile) setActiveMobileView('extensions');
    else toggleExtensions();
  };
  const handleHomeClick = () => {
    if (isMobile) setActiveMobileView('chat');
    // No-op on desktop
  };

  return (
    <Box
      sx={{
        width: 60,
        bgcolor: 'background.paper',
        borderRight: 1,
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 2,
        gap: 2,
      }}
    >
      <Tooltip title="Home" placement="right">
        <IconButton onClick={handleHomeClick}>
          <Home />
        </IconButton>
      </Tooltip>
      <Tooltip title="Profile" placement="right">
        <IconButton onClick={handleProfileClick}>
          <Person />
        </IconButton>
      </Tooltip>
      <Tooltip title="Extensions" placement="right">
        <IconButton onClick={handleExtensionsClick}>
          <Extension />
        </IconButton>
      </Tooltip>
      <Tooltip title="Settings" placement="right">
        <IconButton>
          <Settings />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
