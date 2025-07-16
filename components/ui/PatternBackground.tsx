'use client';
import { Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { usePatternSettings } from '@/store/patterns';

const EMOJIS = ['☺', '★', '♫', '✿', '✦', '✧', '☀', '☁', '☂', '☾'];

export default function PatternBackground({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const { opacity, scale, animationEnabled } = usePatternSettings();

  // Pick a few emojis for the pattern
  const emojis = EMOJIS;

  // Emoji color: barely visible, adapts to theme
  const emojiColor =
    theme.palette.mode === 'dark'
      ? 'rgba(245, 233, 218, 0.06)'
      : 'rgba(124, 77, 30, 0.07)';

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Animated Emoji Pattern Background */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1,
          opacity: opacity / 100,
          pointerEvents: 'none',
        }}
        animate={animationEnabled ? {
          x: [0, 20, 0],
          y: [0, -20, 0],
        } : {}}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <svg
          width="100%"
          height="100%"
          style={{
            display: 'block',
            transform: `scale(${scale / 100})`,
          }}
        >
          <defs>
            <pattern
              id="emoji-pattern"
              x="0"
              y="0"
              width="64"
              height="64"
              patternUnits="userSpaceOnUse"
            >
              <text
                x="16"
                y="32"
                fontSize="32"
                fill={emojiColor}
                fontFamily="Segoe UI Emoji, Apple Color Emoji, Noto Color Emoji, sans-serif"
                opacity="1"
              >
                {emojis[0]}
              </text>
              <text
                x="48"
                y="16"
                fontSize="24"
                fill={emojiColor}
                fontFamily="Segoe UI Emoji, Apple Color Emoji, Noto Color Emoji, sans-serif"
                opacity="0.8"
              >
                {emojis[1]}
              </text>
              <text
                x="32"
                y="56"
                fontSize="20"
                fill={emojiColor}
                fontFamily="Segoe UI Emoji, Apple Color Emoji, Noto Color Emoji, sans-serif"
                opacity="0.7"
              >
                {emojis[2]}
              </text>
              <text
                x="0"
                y="56"
                fontSize="18"
                fill={emojiColor}
                fontFamily="Segoe UI Emoji, Apple Color Emoji, Noto Color Emoji, sans-serif"
                opacity="0.5"
              >
                {emojis[3]}
              </text>
              <text
                x="56"
                y="56"
                fontSize="16"
                fill={emojiColor}
                fontFamily="Segoe UI Emoji, Apple Color Emoji, Noto Color Emoji, sans-serif"
                opacity="0.4"
              >
                {emojis[4]}
              </text>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#emoji-pattern)" />
        </svg>
      </motion.div>
      {/* Content */}
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {children}
      </Box>
    </Box>
  );
}
