'use client';
import { useState } from 'react';
import Button from '../components/ui/Button';
import LoginPanel from '../components/auth/ContinuePanel';
import RegisterPanel from '../components/auth/RegisterPanel';
import Topbar from '../components/layout/Topbar';

export default function LandingPage() {
  const [panel, setPanel] = useState<'login' | 'register' | null>(null);

  return (
    <>
      <Topbar />
      <main className="flex flex-col center" style={{ minHeight: '100vh' }}>
        <h1>WhisperrNote</h1>
        <p>Secure, extensible chat platform</p>
        <div className="flex" style={{ gap: 24 }}>
          <Button onClick={() => setPanel('login')}>Login</Button>
          <Button onClick={() => setPanel('register')}>Register</Button>
        </div>
        {/* Overlay for Login/Register */}
        {panel && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 100,
            }}
          >
            <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 4px 32px #0002', position: 'relative' }}>
              <Button
                onClick={() => setPanel(null)}
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  padding: '2px 10px',
                  fontSize: 14,
                  background: '#eee',
                  color: '#333',
                }}
              >
                ×
              </Button>
              {panel === 'login' ? <LoginPanel /> : <RegisterPanel />}
            </div>
          </div>
        )}
      </main>
    </>
  );
}