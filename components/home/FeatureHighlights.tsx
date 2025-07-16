import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
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
  return (
    <Box sx={{ my: 6 }}>
      <Grid container spacing={4}>
        {features.map((f, i) => (
          <Grid item xs={12} sm={6} key={i}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {f.icon}
              <Box>
                <Typography variant="h6" fontWeight={600}>{f.title}</Typography>
                <Typography variant="body2" color="text.secondary">{f.desc}</Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
