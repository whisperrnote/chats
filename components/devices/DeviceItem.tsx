export default function DeviceItem() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '8px 16px', borderRadius: 8, marginBottom: 4
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: '50%', background: 'var(--color-border)'
      }} />
      <div>
        <div style={{ fontWeight: 500 }}>Device Name</div>
        <div style={{ fontSize: 12, color: 'var(--color-accent)' }}>Last active: just now</div>
      </div>
    </div>
  );
}
