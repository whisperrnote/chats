'use client';
import { Box, Typography, Container, Button, Stack, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { PlayArrow, Security, Speed, Extension } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const HeroContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  zIndex: 1,
  paddingTop: '120px',
  paddingBottom: '80px',
}));

const GradientBackground = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: `
    radial-gradient(circle at 25% 25%, rgba(74, 144, 226, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(245, 101, 101, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(78, 205, 196, 0.05) 0%, transparent 50%)
  `,
  zIndex: -1,
});

const FloatingCard = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  background: 'rgba(255, 255, 255, 0.08)',
  backdropFilter: 'blur(20px)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  padding: '16px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
}));

export default function HeroSection() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/auth');
  };

  const handleWatchDemo = () => {
    // TODO: Implement demo video/tour
    console.log('Watch demo clicked');
  };

  return (
    <HeroContainer maxWidth="lg">
      <GradientBackground />
      
      {/* Floating Elements */}
      <FloatingCard
        animate={{
          y: [0, -20, 0],
          rotate: [0, 2, -2, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          top: '15%',
          left: '8%',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <Security color="primary" fontSize="small" />
        <Typography variant="caption" fontWeight={600}>
          End-to-End Encrypted
        </Typography>
      </FloatingCard>

      <FloatingCard
        animate={{
          y: [0, 25, 0],
          rotate: [0, -2, 2, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          top: '25%',
          right: '10%',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <Extension color="primary" fontSize="small" />
        <Typography variant="caption" fontWeight={600}>
          Extensible Platform
        </Typography>
      </FloatingCard>

      <FloatingCard
        animate={{
          y: [0, -15, 0],
          rotate: [0, 1, -1, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          bottom: '30%',
          left: '12%',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <Speed color="primary" fontSize="small" />
        <Typography variant="caption" fontWeight={600}>
          Lightning Fast
        </Typography>
      </FloatingCard>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ textAlign: 'center', maxWidth: '900px', width: '100%' }}
      >
        {/* Beta Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Chip 
            label="Beta Release" 
            color="primary" 
            variant="outlined"
            size="small"
            sx={{ 
              mb: 3,
              borderRadius: '20px',
              fontWeight: 600,
              letterSpacing: '0.5px',
            }}
          />
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
              lineHeight: 1.1,
              mb: 3,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              letterSpacing: '-0.02em',
            }}
          >
            The Future of
            <br />
            Private Messaging
          </Typography>
        </motion.div>

        {/* Subheadline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 400,
              mb: 4,
              color: 'text.secondary',
              lineHeight: 1.6,
              maxWidth: '700px',
              margin: '0 auto 2rem auto',
              fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' },
            }}
          >
            Experience unlimited freedom with end-to-end encryption by default. 
            Open source, extensible, and built for the next generation of digital privacy.
          </Typography>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2} 
            justifyContent="center"
            alignItems="center"
            sx={{ mb: 4 }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={handleGetStarted}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: '50px',
                textTransform: 'none',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 40px rgba(102, 126, 234, 0.4)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Get Started Free
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              startIcon={<PlayArrow />}
              onClick={handleWatchDemo}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: '50px',
                textTransform: 'none',
                borderColor: 'primary.main',
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'rgba(102, 126, 234, 0.05)',
                },
              }}
            >
              Watch Demo
            </Button>
          </Stack>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={{ xs: 1, sm: 4 }} 
            justifyContent="center"
            alignItems="center"
            sx={{ opacity: 0.8 }}
          >
            <Typography variant="body2" color="text.secondary">
              ✓ Open Source
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ✓ No Tracking
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ✓ Always Free
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ✓ End-to-End Encrypted
            </Typography>
          </Stack>
        </motion.div>
      </motion.div>
    </HeroContainer>
  );
}
