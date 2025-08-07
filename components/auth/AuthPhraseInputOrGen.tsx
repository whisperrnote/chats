'use client';
import { useState } from 'react';

import { motion } from 'framer-motion';

import {
  canonizeUsername,
  createUserProfile,
  findUserByUsername,

  ID,
  loginEmailPassword,
  signupEmailPassword,
  usernameToEmail,
} from '@/lib/appwrite';
import {
  deriveEncryptionKey,
  derivePasswordFromPhrase,
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


export default function AuthPhraseInputOrGen() {

  // Log all state values for debugging
  console.log('AuthPhraseInputOrGen state:', {
    usernameExists,
    username,
    phraseType,
    phrase,
    error
  });

  const [loading, setLoading] = useState(false);

  // Signup: create Appwrite account, then user profile in DB
  const handleSignup = async () => {
    console.log('handleSignup called');
    setLoading(true);
    setError('');
    console.log('=== SIGNUP FLOW STARTED ===');
    try {
      // Check if username already exists
      console.log('Step 1: Checking if username exists...');
      const existingUser = await findUserByUsername(username);
console.log('findUserByUsername result:', existingUser);
      if (existingUser) {
        console.log('Username already exists:', existingUser);
        setError('Username already exists. Please choose another.');
        setLoading(false);
        return;
      }
      console.log('Step 1: Username available ✓');

      // Generate unique user ID
      console.log('Step 2: Generating user ID...');
      const userId = ID.unique();
      console.log('Step 2: User ID generated:', userId);

      // Use username-based email
      console.log('Step 3: Generating email...');
      const email = usernameToEmail(username);
      console.log('Step 3: Email generated:', email);

      // Derive a strong password from phrase for Appwrite
      console.log('Step 4: Deriving password...');
      const derivedPassword = derivePasswordFromPhrase(phrase, username);
      console.log('Step 4: Password derived, length:', derivedPassword.length);
      
      // Debug logging
      console.log('Step 5: Calling signupEmailPassword with:', {
        email,
        passwordLength: derivedPassword.length,
        username,
        userId
      });
      
      // Create Appwrite account and session
      console.log('Step 5: Creating Appwrite account...');
      const { session, account: createdAccount } = await signupEmailPassword(email, derivedPassword, username, userId);
      console.log('Step 5: Appwrite account created successfully ✓');
      console.log('Created account:', createdAccount);
      console.log('Created session:', session);

      // Derive encryption key from mnemonic
      console.log('Step 6: Deriving encryption key...');
      const encryptionKey = await deriveEncryptionKey(phrase, canonizeUsername(username) || username);
      console.log('Step 6: Encryption key derived ✓');
      
      // Store encryption key in session state
      console.log('Step 7: Storing encryption key in session...');
      const { useEncryption } = require('@/store/encryption');
      useEncryption.getState().setEncryptionKey(encryptionKey);
      console.log('Step 7: Encryption key stored ✓');
      
      // For now, just use the encryptionKey as both publicKey and encryptedPrivateKey (stub)
      const { publicKey, encryptedPrivateKey } = {
        publicKey: encryptionKey,
        encryptedPrivateKey: encryptionKey,
      };

      // Create user profile in database
      console.log('Step 8: Creating user profile in database...');
      const userProfile = await createUserProfile({
        userId,
        username,
        displayName: username,
        email,
        publicKey,
        encryptedPrivateKey,
      });
      console.log('Step 8: User profile created successfully ✓');
      console.log('User profile:', userProfile);

      console.log('=== SIGNUP FLOW COMPLETED SUCCESSFULLY ===');
      setStep('done');
    } catch (err: any) {
      console.error('=== SIGNUP FLOW FAILED ===');
      console.error('Signup error:', err);
      console.error('Error details:', {
        message: err.message,
        code: err.code,
        type: err.type,
        stack: err.stack
      });
      setError(`Failed to create account: ${err.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  // Login: create session
  const handleLogin = async () => {
    console.log('handleLogin called');
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
      const derivedPassword = derivePasswordFromPhrase(phrase, username);
      await loginEmailPassword(email, derivedPassword);
      
      // Derive encryption key and store in session (for message decryption)
      const encryptionKey = await deriveEncryptionKey(phrase, canonizeUsername(username) || username);
      // Store encryption key in session state
      const { useEncryption } = require('@/store/encryption');
      useEncryption.getState().setEncryptionKey(encryptionKey);
      
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
            onClick={e => { console.log('Login button clicked'); handleLogin(); }}
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
              onClick={e => { console.log('Signup button clicked'); handleSignup(); }}
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