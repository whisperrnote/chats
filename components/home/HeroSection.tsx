'use client';
import { Box, Typography, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const HeroContainer = styled(Container)(({ theme }) => ({
  minHeight: '80vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  position: 'relative',
  zIndex: 1,
}));

const GlassCard = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(20px)',
  borderRadius: '32px',
  padding: '3rem 2rem',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  maxWidth: '800px',
  width: '100%',
}));

const FloatingElement = styled(motion.div)({
  position: 'absolute',
  borderRadius: '50%',
  background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
});

export default function HeroSection() {
  return (
    <HeroContainer maxWidth="lg">
      <FloatingElement
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          width: '100px',
          height: '100px',
          top: '20%',
          left: '10%',
        }}
      />
      <FloatingElement
        animate={{
          y: [0, 30, 0],
          rotate: [0, -5, 5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          width: '60px',
          height: '60px',
          top: '30%',
          right: '15%',
        }}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <GlassCard>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Typography
              variant="h1"
              sx={{
                fontWeight: 900,
                fontSize: { xs: '2.5rem', md: '4rem' },
                mb: 2,
                background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                textShadow: '0 0 30px rgba(255, 107, 107, 0.3)',
              }}
            >
              WhisperrNote
            </Typography>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                mb: 3,
                color: 'text.primary',
                opacity: 0.9,
                fontSize: { xs: '1.5rem', md: '2rem' },
              }}
            >
              The Future of Secure Communication
            </Typography>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 400,
                color: 'text.secondary',
                lineHeight: 1.6,
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              Experience unlimited freedom with end-to-end encryption by default. 
              Open source, extensible, and built for the next generation of digital privacy.
            </Typography>
          </motion.div>
        </GlassCard>
      </motion.div>
    </HeroContainer>
  );
}
