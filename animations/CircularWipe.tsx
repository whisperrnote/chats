import { useEffect, useRef } from 'react';

export default function CircularWipe({ show, duration = 600, color = 'var(--color-accent)', onComplete }: { show: boolean, duration?: number, color?: string, onComplete?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (show && ref.current) {
      ref.current.style.clipPath = 'circle(0% at 50% 50%)';
      ref.current.style.transition = `clip-path ${duration}ms cubic-bezier(.4,0,.2,1)`;
      requestAnimationFrame(() => {
        ref.current!.style.clipPath = 'circle(150% at 50% 50%)';
      });
      const timeout = setTimeout(() => onComplete?.(), duration);
      return () => clearTimeout(timeout);
    }
  }, [show, duration, onComplete]);

  if (!show) return null;
  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        inset: 0,
        background: color,
        zIndex: 2000,
        pointerEvents: 'none',
        clipPath: 'circle(0% at 50% 50%)'
      }}
    />
  );
}
