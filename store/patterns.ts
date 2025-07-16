import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type PatternType = 'circles' | 'lines' | 'triangles' | 'dots' | 'waves';

type PatternState = {
  currentPattern: PatternType;
  opacity: number;
  scale: number;
  animationEnabled: boolean;
  setPattern: (pattern: PatternType) => void;
  setOpacity: (opacity: number) => void;
  setScale: (scale: number) => void;
  setAnimationEnabled: (enabled: boolean) => void;
};

export const usePatternSettings = create<PatternState>()(
  persist(
    (set) => ({
      currentPattern: 'circles',
      opacity: 15,
      scale: 100,
      animationEnabled: true,
      
      setPattern: (currentPattern) => set({ currentPattern }),
      setOpacity: (opacity) => set({ opacity }),
      setScale: (scale) => set({ scale }),
      setAnimationEnabled: (animationEnabled) => set({ animationEnabled }),
    }),
    {
      name: 'pattern-settings',
    }
  )
);
