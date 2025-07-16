import { Typography, TextField, Button, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { motion } from 'framer-motion';
import { useAuthFlow } from '../../store/authFlow';
import { generateRecoveryPhrase, verifyRecoveryPhrase } from '../../lib/phrase';

export default function AuthPhraseInputOrGen() {
  const {
    usernameExists,
    phraseType, setPhraseType,
    phrase, setPhrase,
    step, setStep,
    error, setError
  } = useAuthFlow();

  return (
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
}
