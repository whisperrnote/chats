import './globals.css';

import { Inter } from 'next/font/google';

import AppProviders from '@/components/providers/AppProviders';
// Add Civic Auth import
import { CivicAuthProvider } from '@civic/auth-web3/nextjs';

const inter = Inter({ subsets: ['latin'] });

// Helper to check Civic integration
const isCivicEnabled = process.env.NEXT_PUBLIC_INTEGRATION_CIVIC === "true";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {isCivicEnabled ? (
          <CivicAuthProvider>
            <AppProviders>
              {children}
            </AppProviders>
          </CivicAuthProvider>
        ) : (
          <AppProviders>
            {children}
          </AppProviders>
        )}
      </body>
    </html>
  );
}

