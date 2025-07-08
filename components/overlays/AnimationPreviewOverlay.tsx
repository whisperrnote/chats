export default function AnimationPreviewOverlay() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.6)'
    }}>
      <div style={{
        background: 'var(--color-surface)', borderRadius: 'var(--radius)', padding: 32, minWidth: 320, minHeight: 180
      }}>
        {/* TODO: Render animation previews */}
        <span>Animation Preview</span>
      </div>
    </div>
  );
}
