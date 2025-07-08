import { ReactNode } from 'react';

export default function Dropdown({ children }: { children: ReactNode }) {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* TODO: Trigger and dropdown menu */}
      <div style={{ padding: 8, background: 'var(--color-surface)', borderRadius: 8, boxShadow: 'var(--shadow)' }}>
        {children}
      </div>
    </div>
  );
}
