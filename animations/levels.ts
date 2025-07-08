export type AnimationLevel = 'off' | 'minimal' | 'moderate' | 'maximal';

export const animationLevels: AnimationLevel[] = ['off', 'minimal', 'moderate', 'maximal'];

export function getAnimationClass(level: AnimationLevel): string {
  return `anim-${level}`;
}
