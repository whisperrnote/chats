import { ButtonHTMLAttributes } from 'react';

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} style={{ padding: '8px 20px', borderRadius: 8, background: 'var(--color-primary)', color: 'var(--color-text)', border: 'none', fontWeight: 500, ...props.style }}>
      {props.children}
    </button>
  );
}
