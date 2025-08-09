import { Box, Grid, Typography, Card, Stack, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import SecurityIcon from '@mui/icons-material/Security';
import ExtensionIcon from '@mui/icons-material/Extension';
import BoltIcon from '@mui/icons-material/Bolt';
import PublicIcon from '@mui/icons-material/Public';
import CodeIcon from '@mui/icons-material/Code';
import ShieldIcon from '@mui/icons-material/Shield';

const features = [
  {
    icon: <SecurityIcon sx={{ fontSize: 40 }} />,
    title: 'End-to-End Encryption',
    description: 'Military-grade encryption ensures your conversations remain private. Every message is encrypted before leaving your device.',
    color: '#667eea',
  },
  {
    icon: <ExtensionIcon sx={{ fontSize: 40 }} />,
    title: 'Extensible Platform',
    description: 'Integrate bots, web3 wallets, and custom extensions. Build on our open API to create your perfect messaging experience.',
    color: '#f093fb',
  },
  {
    icon: <BoltIcon sx={{ fontSize: 40 }} />,
    title: 'Lightning Fast',
    description: 'Optimized for speed with modern React architecture. Messages sync instantly across all your devices.',
    color: '#f6d365',
  },
  {
    icon: <PublicIcon sx={{ fontSize: 40 }} />,
    title: 'Open Source & Free',
    description: 'Completely transparent, community-driven development. No ads, no tracking, no hidden costs - forever free.',
    color: '#a8edea',
  },
  {
    icon: <CodeIcon sx={{ fontSize: 40 }} />,
    title: 'Developer Friendly',
    description: 'Built with modern web technologies. Comprehensive APIs and documentation for seamless integration.',
    color: '#ffd3a5',
  },
  {
    icon: <ShieldIcon sx={{ fontSize: 40 }} />,
    title: 'Privacy First',
    description: 'Zero data collection, no user tracking. Your privacy is not a product - it\'s a fundamental right.',
    color: '#fd9bb4',
  },
];

export default function FeatureHighlights() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 4 },
        maxWidth: 1200,
        mx: 'auto',
      }}
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Stack spacing={2} alignItems="center" textAlign="center" sx={{ mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              letterSpacing: '-0.02em',
            }}
          >
            Why Choose Whisperrchat?
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              maxWidth: 600,
              lineHeight: 1.6,
              fontSize: { xs: '1rem', md: '1.25rem' },
            }}
          >
            Built for privacy, designed for the future. Experience messaging without compromise.
          </Typography>
        </Stack>
      </motion.div>

      {/* Features Grid */}
      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid size={{ xs: 12, md: 6, lg: 4 }} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <Card
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  background: `linear-gradient(135deg, ${feature.color}08 0%, transparent 100%)`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: feature.color,
                    boxShadow: `0 8px 40px ${feature.color}20`,
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <Stack spacing={3} height="100%">
                  {/* Icon */}
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: `linear-gradient(135deg, ${feature.color}20 0%, ${feature.color}10 100%)`,
                      color: feature.color,
                    }}
                  >
                    {feature.icon}
                  </Box>

                  {/* Content */}
                  <Stack spacing={2} flex={1}>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      sx={{
                        fontSize: '1.25rem',
                        lineHeight: 1.3,
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{
                        lineHeight: 1.6,
                        flex: 1,
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </Stack>
                </Stack>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Box
          sx={{
            mt: 10,
            p: 6,
            borderRadius: 4,
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
            border: '1px solid',
            borderColor: 'primary.main',
          }}
        >
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{ mb: 2, fontSize: { xs: '1.5rem', md: '2rem' } }}
          >
            Ready to experience secure messaging?
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}
          >
            Join thousands of users who trust Whisperrchat for their private communications.
          </Typography>
        </Box>
      </motion.div>
    </Box>
  );
}
