import { Box, Tabs, Tab, Typography, Grid, Card, CardMedia, Stack, Chip, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { useState } from 'react';
import { 
  Info, 
  Photo, 
  Settings, 
  Security,
  LocationOn,
  Schedule,
  Language,
  Verified
} from '@mui/icons-material';

interface ProfileSectionsProps {
  user: any;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <Box hidden={value !== index} sx={{ pt: 3 }}>
      {value === index && children}
    </Box>
  );
}

export default function ProfileSections({ user }: ProfileSectionsProps) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ px: { xs: 2, sm: 4 }, pb: 4 }}>
      <Tabs 
        value={activeTab} 
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{
          '& .MuiTabs-indicator': {
            borderRadius: '2px 2px 0 0',
            height: 3,
          },
          '& .MuiTab-root': {
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.95rem',
          }
        }}
      >
        <Tab icon={<Info />} label="About" />
        <Tab icon={<Photo />} label="Media" />
        <Tab icon={<Settings />} label="Privacy" />
      </Tabs>

      {/* About Tab */}
      <TabPanel value={activeTab} index={0}>
        <Stack spacing={3}>
          {/* Basic Info */}
          <Box>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
              Information
            </Typography>
            <List disablePadding>
              {user.location && (
                <ListItem disablePadding sx={{ py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <LocationOn color="action" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Location" 
                    secondary={user.location}
                    primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                    secondaryTypographyProps={{ variant: 'body1', color: 'text.primary' }}
                  />
                </ListItem>
              )}
              
              {user.joinedDate && (
                <ListItem disablePadding sx={{ py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Schedule color="action" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Joined" 
                    secondary={new Date(user.joinedDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                    primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                    secondaryTypographyProps={{ variant: 'body1', color: 'text.primary' }}
                  />
                </ListItem>
              )}

              {user.language && (
                <ListItem disablePadding sx={{ py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Language color="action" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Language" 
                    secondary={user.language}
                    primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                    secondaryTypographyProps={{ variant: 'body1', color: 'text.primary' }}
                  />
                </ListItem>
              )}
            </List>
          </Box>

          {/* Badges/Achievements */}
          {(user.verified || user.premium || user.badges?.length > 0) && (
            <Box>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                Badges
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                {user.verified && (
                  <Chip
                    icon={<Verified />}
                    label="Verified"
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                )}
                {user.premium && (
                  <Chip
                    label="Premium"
                    color="warning"
                    variant="outlined"
                    size="small"
                  />
                )}
                {user.badges?.map((badge: string, index: number) => (
                  <Chip
                    key={index}
                    label={badge}
                    variant="outlined"
                    size="small"
                  />
                ))}
              </Stack>
            </Box>
          )}
        </Stack>
      </TabPanel>

      {/* Media Tab */}
      <TabPanel value={activeTab} index={1}>
        <Box>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
            Shared Media
          </Typography>
          
          {user.sharedMedia?.length > 0 ? (
            <Grid container spacing={2}>
              {user.sharedMedia.map((media: any, index: number) => (
                <Grid size={{ xs: 6, sm: 4, md: 3 }} key={index}>
                  <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
                    <CardMedia
                      component="img"
                      height="120"
                      image={media.url}
                      alt={media.alt || 'Shared media'}
                      sx={{ objectFit: 'cover' }}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ 
              textAlign: 'center', 
              py: 6,
              color: 'text.secondary',
              bgcolor: 'action.hover',
              borderRadius: 2,
            }}>
              <Photo sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
              <Typography variant="body1">
                No shared media yet
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Photos and videos shared in chats will appear here
              </Typography>
            </Box>
          )}
        </Box>
      </TabPanel>

      {/* Privacy Tab */}
      <TabPanel value={activeTab} index={2}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
              Privacy Settings
            </Typography>
            <List disablePadding>
              <ListItem disablePadding sx={{ py: 1 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Security color="action" />
                </ListItemIcon>
                <ListItemText 
                  primary="Last Seen" 
                  secondary={user.showLastSeen ? 'Visible to contacts' : 'Hidden'}
                  primaryTypographyProps={{ variant: 'body1' }}
                  secondaryTypographyProps={{ 
                    variant: 'body2', 
                    color: user.showLastSeen ? 'success.main' : 'text.secondary' 
                  }}
                />
              </ListItem>

              <ListItem disablePadding sx={{ py: 1 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Photo color="action" />
                </ListItemIcon>
                <ListItemText 
                  primary="Profile Photo" 
                  secondary={user.profilePhotoPrivacy || 'Visible to everyone'}
                  primaryTypographyProps={{ variant: 'body1' }}
                  secondaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                />
              </ListItem>
            </List>
          </Box>

          <Box sx={{ 
            p: 3,
            bgcolor: 'warning.light',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'warning.main',
          }}>
            <Typography variant="body2" color="warning.contrastText">
              <strong>Note:</strong> Some privacy settings can only be changed by the user themselves.
            </Typography>
          </Box>
        </Stack>
      </TabPanel>
    </Box>
  );
}