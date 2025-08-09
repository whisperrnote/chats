import { Box, Button, IconButton, Stack, Tooltip, Menu, MenuItem, Divider } from '@mui/material';
import { 
  Message, 
  Call, 
  MoreVert, 
  Block, 
  Report, 
  PersonAdd, 
  Lock, 
  Schedule, 
  Notifications,
  CardGiftcard,
  ContentCopy
} from '@mui/icons-material';
import { useState } from 'react';

interface ProfileActionsProps {
  user: any;
  onAction?: (action: string) => void;
}

export default function ProfileActions({ user, onAction }: ProfileActionsProps) {
  const [moreMenuAnchor, setMoreMenuAnchor] = useState<null | HTMLElement>(null);

  const handleAction = (action: string) => {
    if (action === 'copy-username') {
      navigator.clipboard.writeText(user.username);
    }
    onAction?.(action);
    setMoreMenuAnchor(null);
  };

  return (
    <Box sx={{ px: { xs: 2, sm: 4 }, pb: 3 }}>
      {/* Primary Actions */}
      <Stack 
        direction="row" 
        spacing={2} 
        justifyContent={{ xs: 'center', sm: 'flex-start' }}
        sx={{ mb: 2 }}
      >
        <Button
          variant="contained"
          size="large"
          startIcon={<Message />}
          onClick={() => handleAction('message')}
          sx={{ 
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
          }}
        >
          Message
        </Button>
        
        <Button
          variant="outlined"
          size="large"
          startIcon={<Call />}
          onClick={() => handleAction('call')}
          sx={{ 
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
          }}
        >
          Call
        </Button>

        <Tooltip title="More actions">
          <IconButton
            size="large"
            onClick={(e) => setMoreMenuAnchor(e.currentTarget)}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
            }}
          >
            <MoreVert />
          </IconButton>
        </Tooltip>
      </Stack>

      {/* Quick Actions */}
      <Stack direction="row" spacing={1} justifyContent={{ xs: 'center', sm: 'flex-start' }} flexWrap="wrap" gap={1}>
        <Tooltip title="Add to contacts">
          <IconButton 
            size="small"
            onClick={() => handleAction('add-contact')}
            sx={{ bgcolor: 'action.hover', borderRadius: 1.5 }}
          >
            <PersonAdd fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Lock chat">
          <IconButton 
            size="small"
            onClick={() => handleAction('lock-chat')}
            sx={{ bgcolor: 'action.hover', borderRadius: 1.5 }}
          >
            <Lock fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Disappearing messages">
          <IconButton 
            size="small"
            onClick={() => handleAction('disappearing-messages')}
            sx={{ bgcolor: 'action.hover', borderRadius: 1.5 }}
          >
            <Schedule fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Notifications">
          <IconButton 
            size="small"
            onClick={() => handleAction('notifications')}
            sx={{ bgcolor: 'action.hover', borderRadius: 1.5 }}
          >
            <Notifications fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Copy username">
          <IconButton 
            size="small"
            onClick={() => handleAction('copy-username')}
            sx={{ bgcolor: 'action.hover', borderRadius: 1.5 }}
          >
            <ContentCopy fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>

      {/* More Actions Menu */}
      <Menu
        anchorEl={moreMenuAnchor}
        open={Boolean(moreMenuAnchor)}
        onClose={() => setMoreMenuAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: 2,
            minWidth: 200,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          }
        }}
      >
        <MenuItem onClick={() => handleAction('gift-premium')}>
          <CardGiftcard sx={{ mr: 2, fontSize: 20 }} />
          Gift Premium
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleAction('block')} sx={{ color: 'error.main' }}>
          <Block sx={{ mr: 2, fontSize: 20 }} />
          Block User
        </MenuItem>
        <MenuItem onClick={() => handleAction('report')} sx={{ color: 'error.main' }}>
          <Report sx={{ mr: 2, fontSize: 20 }} />
          Report User
        </MenuItem>
      </Menu>
    </Box>
  );
}