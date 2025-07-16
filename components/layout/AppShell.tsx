import { Box } from '@mui/material';
import Sidebar from '../app/Sidebar';
import ChatList from '@/components/app/ChatList';
import ChatWindow from '@/components/app/ChatWindow';
import ProfilePanel from '@/components/app/ProfilePanel';
import ExtensionPanel from '@/components/app/ExtensionPanel';
import ResponsiveDrawer from '@/components/app/ResponsiveDrawer';
import { useAppLayout } from '@/store/layout';

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
