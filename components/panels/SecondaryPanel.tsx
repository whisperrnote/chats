'use client';

import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';

import { usePanelStore } from '@/store/panelStore';
import ChatList from '@/components/chat/ChatList';
import ContactList from '@/components/contacts/ContactList';
import ProfilePanel from '@/components/panels/ProfilePanel';
import SettingsPanel from '@/components/panels/SettingsPanel';
import ExtensionsPanel from '@/components/panels/ExtensionsPanel';

const PanelContainer = styled(motion.div)(({ theme }) => ({
  width: 360,
  height: '100vh',
  borderRight: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
}));

const PanelHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const PanelContent = styled(Box)({
  flex: 1,
  overflowY: 'auto',
});

const panelComponents = {
  chats: { component: ChatList, title: 'Chats' },
  contacts: { component: ContactList, title: 'Contacts' },
  profile: { component: ProfilePanel, title: 'Profile' },
  settings: { component: SettingsPanel, title: 'Settings' },
  extensions: { component: ExtensionsPanel, title: 'Extensions' },
};

export default function SecondaryPanel() {
  const { activePanel, isSecondaryPanelOpen } = usePanelStore();

  const ActivePanel = activePanel ? panelComponents[activePanel]?.component : null;
  const title = activePanel ? panelComponents[activePanel]?.title : '';

  return (
    <AnimatePresence>
      {isSecondaryPanelOpen && (
        <PanelContainer
          initial={{ x: -360, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -360, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <PanelHeader>
            <Typography variant="h6" component="h2" fontWeight={600}>
              {title}
            </Typography>
          </PanelHeader>
          <PanelContent>
            {ActivePanel ? <ActivePanel /> : <div>Select a panel</div>}
          </PanelContent>
        </PanelContainer>
      )}
    </AnimatePresence>
  );
}
