'use client';
import Container from '@mui/material/Container';
import { motion } from 'framer-motion';
import { useAuthFlow } from '@/store/authFlow';
import AuthUsernameInput from '@/components/auth/AuthUsernameInput';
import AuthPhraseInputOrGen from '@/components/auth/AuthPhraseInputOrGen';
import AuthShowPhrase from '@/components/auth/AuthShowPhrase';
import AuthPasscodeInput from '@/components/auth/AuthPasscodeInput';
import AuthDone from '@/components/auth/AuthDone';

export default function AuthPage() {
  const { step } = useAuthFlow();

  const panelVariants = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0, transition: { type: 'spring', duration: 0.6 } }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <motion.div
        variants={panelVariants}
        initial="initial"
        animate="animate"
        style={{ background: 'var(--color-surface)', borderRadius: 16, boxShadow: '0 4px 32px #0002', padding: 32 }}
      >
        {step === 'username' && <AuthUsernameInput />}
        {step === 'phrase' && <AuthPhraseInputOrGen />}
        {step === 'showPhrase' && <AuthShowPhrase />}
        {step === 'passcode' && <AuthPasscodeInput />}
        {step === 'done' && <AuthDone />}
      </motion.div>
    </Container>
  );
}