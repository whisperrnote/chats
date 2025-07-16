import { Box, IconButton, Tooltip } from '@mui/material';
import { Home, Settings, Person, Extension } from '@mui/icons-material';
import { useAppLayout } from '@/store/layout';

export default function Sidebar() {
  const { toggleProfile, toggleExtensions } = useAppLayout();

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
        <IconButton>
          <Home />
        </IconButton>
      </Tooltip>
      <Tooltip title="Profile" placement="right">
        <IconButton onClick={toggleProfile}>
          <Person />
        </IconButton>
      </Tooltip>
      <Tooltip title="Extensions" placement="right">
        <IconButton onClick={toggleExtensions}>
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
