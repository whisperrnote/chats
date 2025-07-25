'use client';
import { useState } from 'react';

import { motion } from 'framer-motion';

import {
  createUserProfile,
  findUserByUsername,
  getEmailFromCivicUser,
  ID,
  loginEmailPassword,
  signupEmailPassword,
  usernameToEmail,
} from '@/lib/appwrite';
import {
  deriveEncryptionKey,
  generateRecoveryPhrase,
} from '@/lib/phrase';
import { useAuthFlow } from '@/store/authFlow';
import {
  Button,
  CircularProgress,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';

// Civic integration flag
const isCivicEnabled = process.env.NEXT_PUBLIC_INTEGRATION_CIVIC === "true";

// Only import Civic hooks/components if enabled
let useCivicUser: any = null;
if (isCivicEnabled) {
  // @ts-ignore
  useCivicUser = require('@civic/auth-web3/react').useUser;
}

export default function AuthPhraseInputOrGen() {
  const {
    usernameExists,
    username,
    phraseType, setPhraseType,
    phrase, setPhrase,
    setStep,
    error, setError
  } = useAuthFlow() as {
    usernameExists: boolean;
    username: string;
    phraseType: 12 | 24 | null;
    setPhraseType: (val: 12 | 24 | null) => void;
    phrase: string;
    setPhrase: (val: string) => void;
    setStep: (val: string) => void;
    error: string;
    setError: (val: string) => void;
  };

  const [loading, setLoading] = useState(false);

  // Helper: derive public/private keypair and encrypt private key (stub for now)
  async function generateKeysAndEncrypt(phrase: string, username: string) {
    // In production, use libsodium or similar for keypair generation
    // Here, just use the encryption key as both public and encrypted private key for demo
    const encryptionKey = await deriveEncryptionKey(phrase, username);
    return {
      publicKey: encryptionKey,
      encryptedPrivateKey: encryptionKey,
    };
  }

  // Signup: create Appwrite account, then user profile in DB
  const handleSignup = async () => {
    setLoading(true);
    setError('');
    try {
      // Check if username already exists
      const existingUser = await findUserByUsername(username);
      if (existingUser) {
        setError('Username already exists. Please choose another.');
        setLoading(false);
        return;
      }

      // Generate unique user ID
      const userId = ID.unique();

      // Civic fallback logic
      let civicUser = null;
      if (isCivicEnabled && useCivicUser) {
        civicUser = useCivicUser().user;
      }
      // Try to get email from Civic, fallback to username-based email
      const email =
        getEmailFromCivicUser(civicUser) || usernameToEmail(username);

      // Create Appwrite account and session
      const { session } = await signupEmailPassword(email, phrase, username, userId);

      // Derive encryption key from mnemonic
      const encryptionKey = await deriveEncryptionKey(phrase, canonizeUsername(username) || username);
      // For now, just use the encryptionKey as both publicKey and encryptedPrivateKey (stub)
      const { publicKey, encryptedPrivateKey } = {
        publicKey: encryptionKey,
        encryptedPrivateKey: encryptionKey,
      };

      // Create user profile in database
      await createUserProfile({
        userId,
        username,
        displayName: username,
        email,
        publicKey,
        encryptedPrivateKey,
      });

      setStep('done');
    } catch (e: any) {
      console.error('Signup error:', e);
      setError(`Failed to create account: ${e.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  // Login: create session
  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const user = await findUserByUsername(username);
      if (!user) {
        setError('Username does not exist.');
        setLoading(false);
        return;
      }
      
      const email = usernameToEmail(username);
      await loginEmailPassword(email, phrase);
      
      // Derive encryption key and store in session (for message decryption)
      const encryptionKey = await deriveEncryptionKey(phrase, canonizeUsername(username) || username);
      // Store in context/zustand for session use
      
      setStep('done');
    } catch (e: any) {
      console.error('Login error:', e);
      setError('Invalid recovery phrase or account.');
    } finally {
      setLoading(false);
    }
  };

  const handlePhraseTypeChange = (_: React.MouseEvent<HTMLElement>, value: number | null) => {
    if (value === 12 || value === 24) {
      setPhraseType(value);
    } else {
      setPhraseType(null);
    }
  };

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
            onClick={handleLogin}
            disabled={!phrase || loading}
          >
            {loading ? <CircularProgress size={20} /> : 'Login'}
          </Button>
          {error && <Typography color="error">{error}</Typography>}
        </>
      ) : (
        <>
          <Typography variant="h6" mb={2}>Select phrase type</Typography>
          <ToggleButtonGroup
            value={phraseType}
            exclusive
            onChange={handlePhraseTypeChange}
            sx={{ mb: 2 }}
          >
            <ToggleButton value={12}>12 words</ToggleButton>
            <ToggleButton value={24}>24 words</ToggleButton>
          </ToggleButtonGroup>
          <Button
            variant="contained"
            onClick={() => {
              if (phraseType === 12 || phraseType === 24) {
                const newPhrase = generateRecoveryPhrase(phraseType);
                setPhrase(newPhrase);
                setStep('showPhrase');
              }
            }}
            disabled={!phraseType}
          >
            Generate Phrase
          </Button>
          {phrase && (
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleSignup}
              disabled={!phrase || loading}
            >
              {loading ? <CircularProgress size={20} /> : 'Sign Up'}
            </Button>
          )}
          {error && <Typography color="error">{error}</Typography>}
        </>
      )}
    </motion.div>
  );
}