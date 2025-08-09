import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { motion } from 'framer-motion';

interface AuthActionsProps {
  onLogin: () => void;
  onRegister: () => void;
}

export default function AuthActions({ onLogin, onRegister }: AuthActionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        spacing={2} 
        justifyContent="center" 
        sx={{ mt: 6 }}
      >
        <Button 
          variant="contained" 
          size="large" 
          onClick={onRegister}
          sx={{
            px: 4,
            py: 1.5,
            fontSize: '1.1rem',
            fontWeight: 600,
            borderRadius: '50px',
            textTransform: 'none',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 12px 40px rgba(102, 126, 234, 0.4)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          Get Started Free
        </Button>
        
        <Button 
          variant="outlined" 
          size="large" 
          onClick={onLogin}
          sx={{
            px: 4,
            py: 1.5,
            fontSize: '1.1rem',
            fontWeight: 600,
            borderRadius: '50px',
            textTransform: 'none',
            borderColor: 'primary.main',
            '&:hover': {
              borderColor: 'primary.main',
              backgroundColor: 'rgba(102, 126, 234, 0.05)',
            },
          }}
        >
          Sign In
        </Button>
      </Stack>
    </motion.div>
  );
}
