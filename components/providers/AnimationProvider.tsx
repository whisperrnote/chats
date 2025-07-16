'use client';
import { createContext, useContext, useEffect } from 'react';
import { useAnimationSettings } from '@/store/animations';

const AnimationContext = createContext({});

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const { animationLevel } = useAnimationSettings();

  useEffect(() => {
    document.body.className = document.body.className.replace(/anim-\w+/g, '');
    document.body.classList.add(`anim-${animationLevel}`);
  }, [animationLevel]);

  return (
    <AnimationContext.Provider value={{}}>
      {children}
    </AnimationContext.Provider>
  );
}

export const useAnimation = () => useContext(AnimationContext);
