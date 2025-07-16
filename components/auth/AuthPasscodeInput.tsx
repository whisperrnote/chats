'use client';
import { Typography, TextField, Button, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { useAuthFlow } from '@/store/authFlow';

export default function AuthPasscodeInput() {
  const { passcode, setPasscode, setStep } = useAuthFlow();

  return (
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
}
