import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AnimationLevel = 'off' | 'minimal' | 'moderate' | 'maximal';

type AnimationState = {
  animationLevel: AnimationLevel;
  enableTransitions: boolean;
  enableHoverEffects: boolean;
  enableParticles: boolean;
  setAnimationLevel: (level: AnimationLevel) => void;
  setEnableTransitions: (enabled: boolean) => void;
  setEnableHoverEffects: (enabled: boolean) => void;
  setEnableParticles: (enabled: boolean) => void;
};

export const useAnimationSettings = create<AnimationState>()(
  persist(
    (set) => ({
      animationLevel: 'moderate',
      enableTransitions: true,
      enableHoverEffects: true,
      enableParticles: false,
      
      setAnimationLevel: (animationLevel) => set({ animationLevel }),
      setEnableTransitions: (enableTransitions) => set({ enableTransitions }),
      setEnableHoverEffects: (enableHoverEffects) => set({ enableHoverEffects }),
      setEnableParticles: (enableParticles) => set({ enableParticles }),
    }),
    {
      name: 'animation-settings',
    }
  )
);
