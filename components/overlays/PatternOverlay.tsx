export default function PatternOverlay() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 0,
      opacity: 0.15,
      background: 'repeating-linear-gradient(45deg, var(--color-border), var(--color-border) 2px, transparent 2px, transparent 24px)'
    }} />
  );
}
