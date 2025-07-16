'use client';
import { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Topbar from '../components/layout/Topbar';
import HeroSection from '../components/home/HeroSection';
import FeatureHighlights from '../components/home/FeatureHighlights';
import AuthActions from '../components/home/AuthActions';
import LoginPanel from '../components/auth/ContinuePanel';
import RegisterPanel from '../components/auth/RegisterPanel';

export default function PageClient() {
  const [panel, setPanel] = useState<'login' | 'register' | null>(null);

  return (
    <>
      <Topbar />
      <Container maxWidth="md" sx={{ py: 8 }}>
        <HeroSection />
        <FeatureHighlights />
        <AuthActions onLogin={() => setPanel('login')} onRegister={() => setPanel('register')} />
      </Container>
      {/* Overlay for Login/Register */}
      {panel && (
        <Box
          sx={{
            position: 'fixed',
            inset: 0,
            bgcolor: 'rgba(0,0,0,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
          }}
        >
          <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, boxShadow: 4, p: 3, minWidth: 340, position: 'relative' }}>
            <Box
              component="button"
              onClick={() => setPanel(null)}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                p: '2px 10px',
                fontSize: 18,
                bgcolor: 'grey.100',
                color: 'grey.800',
                border: 'none',
                borderRadius: 1,
                cursor: 'pointer',
              }}
            >
              ×
            </Box>
            {panel === 'login' ? <LoginPanel /> : <RegisterPanel />}
          </Box>
        </Box>
      )}
    </>
  );
}
