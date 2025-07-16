import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type PatternType = 'communication' | 'minimal' | 'geometric' | 'emoji-only' | 'custom';

type PatternState = {
  currentPattern: PatternType;
  opacity: number;
  scale: number;
  animationEnabled: boolean;
  emojiRatio: number; // 0-100, percentage of emojis vs geometric shapes
  density: number; // 0-100, how dense the pattern is
  setPattern: (pattern: PatternType) => void;
  setOpacity: (opacity: number) => void;
  setScale: (scale: number) => void;
  setAnimationEnabled: (enabled: boolean) => void;
  setEmojiRatio: (ratio: number) => void;
  setDensity: (density: number) => void;
};

export const usePatternSettings = create<PatternState>()(
  persist(
    (set) => ({
      currentPattern: 'communication',
      opacity: 8, // Very subtle by default
      scale: 100,
      animationEnabled: true,
      emojiRatio: 70, // 70% emojis, 30% geometric shapes
      density: 60, // Medium density
      
      setPattern: (currentPattern) => set({ currentPattern }),
      setOpacity: (opacity) => set({ opacity }),
      setScale: (scale) => set({ scale }),
      setAnimationEnabled: (animationEnabled) => set({ animationEnabled }),
      setEmojiRatio: (emojiRatio) => set({ emojiRatio }),
      setDensity: (density) => set({ density }),
    }),
    {
      name: 'pattern-settings',
    }
  )
);
