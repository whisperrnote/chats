import { Box, Grid, Typography, Paper, useTheme } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import ExtensionIcon from '@mui/icons-material/Extension';
import BoltIcon from '@mui/icons-material/Bolt';
import PublicIcon from '@mui/icons-material/Public';

const features = [
  {
    icon: <SecurityIcon color="primary" fontSize="large" />,
    title: 'End-to-End Encryption',
    desc: 'All chats are encrypted by default for maximum privacy.',
  },
  {
    icon: <ExtensionIcon color="primary" fontSize="large" />,
    title: 'Limitless Extensions',
    desc: 'Integrate bots, web3, wallets, and more with open APIs.',
  },
  {
    icon: <BoltIcon color="primary" fontSize="large" />,
    title: 'Fast & Modern UI',
    desc: 'Built with MUI, optimized for speed and accessibility.',
  },
  {
    icon: <PublicIcon color="primary" fontSize="large" />,
    title: 'Open Source & Free',
    desc: 'No ads, no tracking. Community-driven and transparent.',
  },
];

export default function FeatureHighlights() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        my: 8,
        px: { xs: 2, md: 0 },
        maxWidth: 1000,
        mx: 'auto',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          mb: 4,
          textAlign: 'center',
          color: theme.palette.primary.main,
        }}
      >
        Platform Features
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {features.map((f, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Paper
              elevation={6}
              sx={{
                p: 3,
                borderRadius: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                minHeight: 220,
                bgcolor: theme.palette.background.paper,
                boxShadow: theme.shadows[4],
                transition: 'box-shadow 0.2s',
                '&:hover': {
                  boxShadow: theme.shadows[8],
                },
              }}
            >
              <Box sx={{ mb: 1 }}>{f.icon}</Box>
              <Typography variant="h6" fontWeight={700} sx={{ textAlign: 'center', mb: 1 }}>
                {f.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                {f.desc}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
