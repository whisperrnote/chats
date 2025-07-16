import { Box } from '@mui/material';
import Sidebar from '../app/Sidebar';
import ChatList from '../app/ChatList';
import ChatWindow from '../app/ChatWindow';
import ProfilePanel from '../app/ProfilePanel';
import ExtensionPanel from '../app/ExtensionPanel';
import ResponsiveDrawer from '../app/ResponsiveDrawer';
import { useAppLayout } from '../../store/layout';

export default function AppShell() {
  const { showProfile, showExtensions } = useAppLayout();

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'background.default' }}>
      <Sidebar />
      <ChatList />
      <ChatWindow />
      {showProfile && <ProfilePanel />}
      {showExtensions && <ExtensionPanel />}
      <ResponsiveDrawer />
    </Box>
  );
}
