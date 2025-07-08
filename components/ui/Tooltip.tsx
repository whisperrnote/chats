import { ReactNode } from 'react';

export default function Tooltip({ content, children }: { content: ReactNode, children: ReactNode }) {
  return (
    <span style={{ position: 'relative', cursor: 'help' }}>
      {children}
      <span style={{
        position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', background: 'var(--color-surface)', color: 'var(--color-text)', padding: '4px 8px', borderRadius: 6, fontSize: 12, whiteSpace: 'nowrap', marginBottom: 6, boxShadow: 'var(--shadow)', opacity: 0.9
      }}>
        {content}
      </span>
    </span>
  );
}
