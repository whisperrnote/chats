'use client';
import { Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { usePatternSettings } from '@/store/patterns';

// Communication/tech-related emojis (70% of pattern)
const COMMUNICATION_EMOJIS = [
  '💬', '📱', '💻', '⌨️', '🖥️', '📡', '🌐', '📺', '📻', '🎙️',
  '🔊', '🔉', '🔈', '📞', '☎️', '📧', '📨', '📩', '📤', '📥',
  '📮', '📪', '📫', '📬', '📭', '📯', '📢', '📣', '💾', '💿',
  '📀', '🎵', '🎶', '🎤', '🎧', '🎮', '🕹️', '⚡', '🔌', '🔋',
  '💡', '🔦', '🔍', '🔎', '🔗', '📎', '🖇️', '📐', '📏', '📊',
  '📈', '📉', '🧮', '💯', '🔢', '🔣', '🔤', '🆔', '🆕', '🆓',
  '🔁', '🔂', '▶️', '⏸️', '⏯️', '⏹️', '⏪', '⏩', '⏫', '⏬'
];

// Geometric shapes (30% of pattern)
const GEOMETRIC_SHAPES = [
  '●', '○', '◆', '◇', '■', '□', '▲', '△', '▼', '▽',
  '◀', '▶', '▪', '▫', '▬', '◈', '◉', '◎', '◐', '◑',
  '◒', '◓', '◔', '◕', '◖', '◗', '◘', '◙', '◚', '◛',
  '◜', '◝', '◞', '◟', '◠', '◡', '◢', '◣', '◤', '◥',
  '◦', '◧', '◨', '◩', '◪', '◫', '◬', '◭', '◮', '◯'
];

// Combine arrays with proper ratio (70% emoji, 30% geometric)
const createPatternArray = () => {
  const pattern = [];
  const emojiCount = Math.floor(COMMUNICATION_EMOJIS.length * 0.7);
  const shapeCount = Math.floor(GEOMETRIC_SHAPES.length * 0.3);
  
  // Add emojis (70%)
  for (let i = 0; i < emojiCount; i++) {
    pattern.push({
      symbol: COMMUNICATION_EMOJIS[i % COMMUNICATION_EMOJIS.length],
      type: 'emoji'
    });
  }
  
  // Add geometric shapes (30%)
  for (let i = 0; i < shapeCount; i++) {
    pattern.push({
      symbol: GEOMETRIC_SHAPES[i % GEOMETRIC_SHAPES.length],
      type: 'shape'
    });
  }
  
  // Shuffle the array for better distribution
  return pattern.sort(() => Math.random() - 0.5);
};

export default function PatternBackground({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const { opacity, scale, animationEnabled } = usePatternSettings();

  const patternItems = createPatternArray();
  
  // Outline colors: darkish brown in light mode, lightish brown in dark mode
  const outlineColor = theme.palette.mode === 'dark' 
    ? 'rgba(224, 185, 122, 0.12)'  // lightish brown (#e0b97a with low opacity)
    : 'rgba(124, 77, 30, 0.08)';   // darkish brown (#7c4d1e with low opacity)

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Animated Pattern Background */}
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
          overflow: 'hidden',
        }}
        animate={animationEnabled ? {
          x: [0, 30, 0],
          y: [0, -30, 0],
        } : {}}
        transition={{
          duration: 40,
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
          viewBox="0 0 100 100"
        >
          <defs>
            <pattern
              id="communication-pattern"
              x="0"
              y="0"
              width="8"
              height="8"
              patternUnits="userSpaceOnUse"
            >
              {/* Generate pattern items dynamically */}
              {patternItems.slice(0, 20).map((item, index) => {
                const positions = [
                  { x: 1, y: 1.5, size: 16 },
                  { x: 3, y: 0.5, size: 12 },
                  { x: 5.5, y: 2, size: 14 },
                  { x: 7, y: 0.8, size: 10 },
                  { x: 0.5, y: 3.5, size: 13 },
                  { x: 2.5, y: 4, size: 15 },
                  { x: 4.5, y: 3.2, size: 11 },
                  { x: 6.5, y: 4.5, size: 12 },
                  { x: 1.5, y: 5.5, size: 14 },
                  { x: 3.5, y: 6.2, size: 13 },
                  { x: 5, y: 5.8, size: 10 },
                  { x: 7.2, y: 6.5, size: 12 },
                  { x: 0.8, y: 7.2, size: 11 },
                  { x: 2.8, y: 7.8, size: 15 },
                  { x: 4.2, y: 7.5, size: 13 },
                  { x: 6.8, y: 7.9, size: 9 },
                  { x: 0.2, y: 5.8, size: 8 },
                  { x: 6.2, y: 1.2, size: 9 },
                  { x: 4.8, y: 0.2, size: 7 },
                  { x: 2.2, y: 2.5, size: 8 },
                ];

                const pos = positions[index % positions.length];
                
                if (item.type === 'emoji') {
                  return (
                    <text
                      key={index}
                      x={pos.x}
                      y={pos.y}
                      fontSize={pos.size}
                      fill="transparent"
                      stroke={outlineColor}
                      strokeWidth="0.5"
                      fontFamily="Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif"
                      opacity={0.6 + (index % 4) * 0.1}
                    >
                      {item.symbol}
                    </text>
                  );
                } else {
                  return (
                    <text
                      key={index}
                      x={pos.x}
                      y={pos.y}
                      fontSize={pos.size}
                      fill="transparent"
                      stroke={outlineColor}
                      strokeWidth="0.8"
                      fontFamily="monospace"
                      opacity={0.4 + (index % 3) * 0.1}
                    >
                      {item.symbol}
                    </text>
                  );
                }
              })}
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#communication-pattern)" />
        </svg>
      </motion.div>
      
      {/* Content */}
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {children}
      </Box>
    </Box>
  );
}
