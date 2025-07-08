import './globals.css';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  // In the future, wrap with ThemeProvider and AnimationProvider
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}