'use client';
import { Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { usePatternSettings } from '@/store/patterns';

export default function PatternBackground({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const { currentPattern, opacity, scale, animationEnabled } = usePatternSettings();

  const patternColor = theme.palette.mode === 'dark' ? 'rgba(185, 122, 86, 0.1)' : 'rgba(124, 77, 30, 0.08)';

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Animated Pattern Background */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          opacity: opacity / 100,
        }}
        animate={animationEnabled ? {
          x: [0, 20, 0],
          y: [0, -20, 0],
        } : {}}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <svg width="100%" height="100%" style={{ transform: `scale(${scale / 100})` }}>
          <defs>
            <pattern
              id="geometric-pattern"
              x="0"
              y="0"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              {currentPattern === 'circles' && (
                <circle cx="30" cy="30" r="8" fill="none" stroke={patternColor} strokeWidth="1" />
              )}
              {currentPattern === 'lines' && (
                <>
                  <line x1="0" y1="0" x2="60" y2="60" stroke={patternColor} strokeWidth="1" />
                  <line x1="60" y1="0" x2="0" y2="60" stroke={patternColor} strokeWidth="1" />
                </>
              )}
              {currentPattern === 'triangles' && (
                <polygon points="30,10 50,50 10,50" fill="none" stroke={patternColor} strokeWidth="1" />
              )}
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#geometric-pattern)" />
        </svg>
      </motion.div>
      
      {/* Content */}
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {children}
      </Box>
    </Box>
  );
}
