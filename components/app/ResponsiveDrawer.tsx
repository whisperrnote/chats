'use client';
import { Box, Drawer } from '@mui/material';
import Sidebar from './Sidebar';
import ChatList from './ChatList';
import { useAppLayout } from '../../store/layout';

export default function ResponsiveDrawer() {
  const { mobileOpen, setMobileOpen } = useAppLayout();

  return (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={() => setMobileOpen(false)}
      ModalProps={{ keepMounted: true }}
      sx={{
        display: { xs: 'block', md: 'none' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 320 },
      }}
    >
      <Sidebar />
      <ChatList />
    </Drawer>
  );
}
