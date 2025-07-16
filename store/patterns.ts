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
      opacity: 100, // This is the max, but see note below
      scale: 100,
      animationEnabled: true,
      emojiRatio: 70,
      density: 60,
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

