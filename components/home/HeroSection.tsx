import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function HeroSection() {
  return (
    <Box sx={{ textAlign: 'center', mb: 6 }}>
      <Typography variant="h2" component="h1" fontWeight={700} gutterBottom>
        WhisperrNote
      </Typography>
      <Typography variant="h5" color="text.secondary" gutterBottom>
        The next-generation open-source chat platform
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Secure, extensible, and free. End-to-end encrypted by default. <br />
        More features, more freedom, and limitless integrations.
      </Typography>
    </Box>
  );
}
