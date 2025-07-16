'use client';
import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import { motion } from 'framer-motion';
import { useAuthFlow } from '@/store/authFlow';
import { verifyRecoveryPhrase, generateRecoveryPhrase } from '@/lib/phrase';
import { Typography, TextField, CircularProgress, Button, ToggleButtonGroup, ToggleButton, Box, Stack } from '@mui/material';

export default function AuthPage() {
  // For demonstration, assuming these states come from the auth flow.
  // You may want to move these to your store and update useAuthFlow accordingly.
  const { step, setStep } = useAuthFlow();
  const [username, setUsername] = useState('');
  const [usernameExists, setUsernameExists] = useState<null | boolean>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [phrase, setPhrase] = useState('');
  const [phraseType, setPhraseType] = useState<12 | 24>(12);
  const [passcode, setPasscode] = useState('');

  useEffect(() => {
    if (!username) {
      setUsernameExists(null);
      setError('');
      setLoading(false);
      return;
    }
    setLoading(true);
    setError('');
    const timer = setTimeout(() => {
      // Replace this mock check with your actual username verification logic
      if (username === 'existingUser') {
        setUsernameExists(true);
      } else {
        setUsernameExists(false);
      }
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [username]);

  // Step 1: Username input
  const renderUsernameInput = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Typography variant="h5" mb={2}>Enter your username</Typography>
      <TextField
        label="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        fullWidth
        autoFocus
        sx={{ mb: 2 }}
      />
      {loading && <CircularProgress size={24} />}
      {usernameExists === true && (
        <Typography color="primary" sx={{ mt: 1 }}>Username found. Please enter your recovery phrase.</Typography>
      )}
      {usernameExists === false && (
        <Typography color="secondary" sx={{ mt: 1 }}>Username not found. Create a new account.</Typography>
      )}
      {error && <Typography color="error">{error}</Typography>}
      {usernameExists !== null && (
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => setStep('phrase')}
          disabled={loading || !username}
        >
          Continue
        </Button>
      )}
    </motion.div>
  );

  // Step 2: Phrase input or generation
  const renderPhraseInputOrGen = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {usernameExists ? (
        <>
          <Typography variant="h6" mb={2}>Enter your recovery phrase</Typography>
          <TextField
            label="Recovery Phrase"
            value={phrase}
            onChange={e => setPhrase(e.target.value)}
            fullWidth
            multiline
            sx={{ mb: 2 }}
            placeholder="Enter your 12 or 24 word phrase"
          />
          <Button
            variant="contained"
            onClick={() => {
              if (verifyRecoveryPhrase(phrase, phraseType)) {
                setStep('passcode');
                setError('');
              } else {
                setError('Invalid recovery phrase');
              }
            }}
            disabled={!phrase}
          >
            Login
          </Button>
          {error && <Typography color="error">{error}</Typography>}
        </>
      ) : (
        <>
          <Typography variant="h6" mb={2}>Select phrase type</Typography>
          <ToggleButtonGroup
            value={phraseType}
            exclusive
            onChange={(_, v) => setPhraseType(v)}
            sx={{ mb: 2 }}
          >
            <ToggleButton value={12}>12 words</ToggleButton>
            <ToggleButton value={24}>24 words</ToggleButton>
          </ToggleButtonGroup>
          <Button
            variant="contained"
            onClick={() => {
              const newPhrase = generateRecoveryPhrase(phraseType);
              setPhrase(newPhrase);
              setStep('showPhrase');
            }}
            disabled={!phraseType}
          >
            Generate Phrase
          </Button>
        </>
      )}
    </motion.div>
  );

  // Step 3: Show generated phrase (signup)
  const renderShowPhrase = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Typography variant="h6" mb={2}>Your Recovery Phrase</Typography>
      <Box sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 2, mb: 2 }}>
        <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>{phrase}</Typography>
      </Box>
      <Typography color="warning.main" mb={2}>
        Please write down and securely store your phrase. It cannot be recovered if lost.
      </Typography>
      <Button
        variant="contained"
        onClick={() => setStep('passcode')}
      >
        Continue
      </Button>
    </motion.div>
  );

  // Step 4: Passcode input (optional)
  const renderPasscodeInput = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Typography variant="h6" mb={2}>Set a passcode (optional)</Typography>
      <TextField
        label="Passcode (4 or 6 digits)"
        value={passcode}
        onChange={e => {
          const val = e.target.value.replace(/\D/g, '');
          if (val.length <= 6) setPasscode(val);
        }}
        fullWidth
        sx={{ mb: 2 }}
        type="password"
        inputProps={{ maxLength: 6 }}
        placeholder="Enter 4 or 6 digit passcode"
      />
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          onClick={() => setStep('done')}
          disabled={passcode.length !== 4 && passcode.length !== 6 && passcode.length !== 0}
        >
          Finish
        </Button>
        <Button
          variant="outlined"
          onClick={() => setStep('done')}
        >
          Skip
        </Button>
      </Stack>
    </motion.div>
  );

  // Step 5: Done
  const renderDone = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Typography variant="h5" mb={2}>Authentication Complete!</Typography>
      <Typography variant="body1" mb={2}>
        You are now logged in. Your data is encrypted and secure.
      </Typography>
      {/* Redirect or show next steps */}
    </motion.div>
  );

  // Animation variants (see animations.md)
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
        {step === 'username' && renderUsernameInput()}
        {step === 'phrase' && renderPhraseInputOrGen()}
        {step === 'showPhrase' && renderShowPhrase()}
        {step === 'passcode' && renderPasscodeInput()}
        {step === 'done' && renderDone()}
      </motion.div>
    </Container>
  );
}