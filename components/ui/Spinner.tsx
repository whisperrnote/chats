export default function Spinner({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" style={{ display: 'block' }}>
      <circle cx="20" cy="20" r="16" stroke="var(--color-accent)" strokeWidth="4" fill="none" opacity="0.2" />
      <circle cx="20" cy="20" r="16" stroke="var(--color-accent)" strokeWidth="4" fill="none" strokeDasharray="80" strokeDashoffset="60" style={{ animation: 'spin 1s linear infinite' }} />
      <style>{`@keyframes spin { 100% { stroke-dashoffset: 0; transform: rotate(360deg); } }`}</style>
    </svg>
  );
}
