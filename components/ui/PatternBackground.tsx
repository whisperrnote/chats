'use client';
import { Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { usePatternSettings } from '@/store/patterns';

import { MessageCircle, Smartphone, Laptop, Send, Wifi } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// Define allowed shape types
type ShapeType = "circle" | "ellipse" | "rect" | "triangle" | "diamond";

type PatternItem =
  | { kind: 'icon'; item: { Icon: LucideIcon; name: string } }
  | { kind: 'shape'; item: { type: ShapeType } };

const ICONS: { Icon: LucideIcon; name: string }[] = [
  { Icon: MessageCircle, name: "message" },
  { Icon: Smartphone, name: "phone" },
  { Icon: Laptop, name: "laptop" },
  { Icon: Send, name: "send" },
  { Icon: Wifi, name: "wifi" },
];

const SHAPES: { type: ShapeType }[] = [
  { type: 'circle' },
  { type: 'rect' },
  { type: 'triangle' },
  { type: 'diamond' },
  { type: 'ellipse' },
];

const createPatternArray = (): PatternItem[] => {
  const pattern: PatternItem[] = [];
  const iconCount = 14;
  const shapeCount = 6;

  for (let i = 0; i < iconCount; i++) {
    pattern.push({
      kind: "icon",
      item: ICONS[i % ICONS.length],
    });
  }
  for (let i = 0; i < shapeCount; i++) {
    pattern.push({
      kind: "shape",
      item: SHAPES[i % SHAPES.length],
    });
  }
  return pattern.sort(() => Math.random() - 0.5);
};

export default function PatternBackground({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const { opacity, scale, animationEnabled } = usePatternSettings();

  const patternItems = createPatternArray();

  const outlineColor = theme.palette.mode === 'dark'
    ? 'rgba(224, 185, 122, 0.35)' // was 0.12 or 0.13, now 0.35 for visibility
    : 'rgba(124, 77, 30, 0.25)';  // was 0.08 or 0.13, now 0.25 for visibility

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

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', bgcolor: 'background.default' }}>
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
              {patternItems.map((patternItem, index) => {
                const pos = positions[index % positions.length];
                if (patternItem.kind === 'icon') {
                  const Icon = patternItem.item.Icon;
                  return (
                    <g
                      key={index}
                      transform={`translate(${pos.x}, ${pos.y}) scale(${pos.size / 24})`}
                      opacity={0.6 + (index % 4) * 0.1}
                    >
                      <Icon color={outlineColor} strokeWidth={1.2} style={{ pointerEvents: 'none' }} />
                    </g>
                  );
                } else {
                  switch (patternItem.item.type) {
                    case 'circle':
                      return (
                        <circle
                          key={index}
                          cx={pos.x + pos.size / 16}
                          cy={pos.y + pos.size / 16}
                          r={pos.size / 4}
                          fill="none"
                          stroke={outlineColor}
                          strokeWidth="0.8"
                          opacity={0.5 + (index % 3) * 0.1}
                        />
                      );
                    case 'rect':
                      return (
                        <rect
                          key={index}
                          x={pos.x}
                          y={pos.y}
                          width={pos.size / 1.6}
                          height={pos.size / 3}
                          fill="none"
                          stroke={outlineColor}
                          strokeWidth="0.8"
                          opacity={0.4 + (index % 3) * 0.1}
                          rx={1.5}
                        />
                      );
                    case 'triangle':
                      return (
                        <polygon
                          key={index}
                          points={`
                            ${pos.x},${pos.y + pos.size / 3}
                            ${pos.x + pos.size / 2},${pos.y}
                            ${pos.x + pos.size},${pos.y + pos.size / 3}
                          `}
                          fill="none"
                          stroke={outlineColor}
                          strokeWidth="0.8"
                          opacity={0.4 + (index % 3) * 0.1}
                        />
                      );
                    case 'diamond':
                      return (
                        <polygon
                          key={index}
                          points={`
                            ${pos.x + pos.size / 2},${pos.y}
                            ${pos.x + pos.size},${pos.y + pos.size / 2}
                            ${pos.x + pos.size / 2},${pos.y + pos.size}
                            ${pos.x},${pos.y + pos.size / 2}
                          `}
                          fill="none"
                          stroke={outlineColor}
                          strokeWidth="0.8"
                          opacity={0.4 + (index % 3) * 0.1}
                        />
                      );
                    case 'ellipse':
                      return (
                        <ellipse
                          key={index}
                          cx={pos.x + pos.size / 2}
                          cy={pos.y + pos.size / 2}
                          rx={pos.size / 3}
                          ry={pos.size / 5}
                          fill="none"
                          stroke={outlineColor}
                          strokeWidth="0.8"
                          opacity={0.4 + (index % 3) * 0.1}
                        />
                      );
                    default:
                      return null;
                  }
                }
              })}
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#communication-pattern)" />
        </svg>
      </motion.div>
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {children}
      </Box>
    </Box>
  );
}

