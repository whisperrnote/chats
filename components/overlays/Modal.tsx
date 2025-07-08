import { ReactNode } from 'react';

export default function Modal({ open, onClose, children }: { open: boolean, onClose: () => void, children: ReactNode }) {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        background: 'var(--color-surface)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', minWidth: 320, minHeight: 120, padding: 24, position: 'relative'
      }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 8, right: 8 }}>×</button>
        {children}
      </div>
    </div>
  );
}
