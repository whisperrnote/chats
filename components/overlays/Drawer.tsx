import { ReactNode } from 'react';

export default function Drawer({ open, onClose, children, side = 'right' }: { open: boolean, onClose: () => void, children: ReactNode, side?: 'left' | 'right' }) {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 1000
    }} onClick={onClose}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          [side]: 0,
          height: '100%',
          width: 360,
          background: 'var(--color-surface)',
          boxShadow: 'var(--shadow)',
          borderRadius: side === 'left' ? '0 var(--radius) var(--radius) 0' : 'var(--radius) 0 0 var(--radius)',
          padding: 24
        }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} style={{ position: 'absolute', top: 8, right: 8 }}>×</button>
        {children}
      </div>
    </div>
  );
}
