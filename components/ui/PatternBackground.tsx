'use client';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const PatternContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  zIndex: -1,
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)'
    : 'linear-gradient(135deg, #667eea, #764ba2, #f093fb)',
}));

const PatternSVG = styled('svg')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  opacity: 0.1,
});

export default function PatternBackground({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PatternContainer>
        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <PatternSVG viewBox="0 0 100 100">
            <defs>
              <pattern id="pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="2" fill="currentColor" opacity="0.3" />
                <path d="M5,5 L15,15 M15,5 L5,15" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pattern)" />
          </PatternSVG>
        </motion.div>
      </PatternContainer>
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {children}
      </Box>
    </>
  );
}
