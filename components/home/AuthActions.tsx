import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

interface AuthActionsProps {
  onLogin: () => void;
  onRegister: () => void;
}

export default function AuthActions({ onLogin, onRegister }: AuthActionsProps) {
  return (
    <Stack direction="row" spacing={3} justifyContent="center" sx={{ mt: 6 }}>
      <Button variant="contained" color="primary" size="large" onClick={onLogin}>
        Login
      </Button>
      <Button variant="outlined" color="primary" size="large" onClick={onRegister}>
        Register
      </Button>
    </Stack>
  );
}
