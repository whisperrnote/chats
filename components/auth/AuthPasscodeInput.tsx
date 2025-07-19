'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

import { useAuthFlow } from '@/store/authFlow';
import {
  Button,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

export default function AuthPasscodeInput() {
  const { passcode, setPasscode } = useAuthFlow();
  const router = useRouter();

  // Immediately go to /app after finish or skip
  const handleFinish = () => {
    router.push('/app');
  };

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
          onClick={handleFinish}
          disabled={passcode.length !== 4 && passcode.length !== 6 && passcode.length !== 0}
        >
          Finish
        </Button>
        <Button
          variant="outlined"
          onClick={handleFinish}
        >
          Skip
        </Button>
      </Stack>
    </motion.div>
  );
}
