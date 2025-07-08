export default function Avatar({ src, alt, size = 40 }: { src?: string; alt?: string; size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', background: 'var(--color-border)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      {src ? <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ color: 'var(--color-accent)' }}>?</span>}
    </div>
  );
}
