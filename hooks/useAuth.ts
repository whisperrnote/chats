import { useState } from 'react';
import {
  generateRecoveryPhrase,
  verifyRecoveryPhrase,
  derivePasswordFromPhrase,
  deriveEncryptionKey,
} from '@/lib/phrase';
import {
  generateKeypair,
  encryptPrivateKey,
  decryptPrivateKey,
  strToUint8,
  uint8ToStr,
} from '@/lib/crypto';
import {
  signupEmailPassword,
  loginEmailPassword,
  findUserByUsername,
  updateUser,
  getCurrentAccount,
  logout,
  canonizeUsername,
} from '@/lib/appwrite';
import { useAuth as useZustandAuth } from '@/store/auth';
import { useEncryption } from '@/store/encryption';
import { useAuthFlow } from '@/store/authFlow';
import { ID } from 'appwrite';
import { Buffer } from 'buffer';

function usernameToEmail(username: string): string {
  return `${canonizeUsername(username)}@users.noreply.whisperrchat.space`;
}

export function useAuth() {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    setUser,
    setLoading,
    setError,
    initializeAuth,
    signOut: zustandSignOut,
  } = useZustandAuth();
  const { setEncryptionKey, setKeyPair, clearKeys } = useEncryption();
  const { setStep, setPhrase } = useAuthFlow();
  const [authError, setAuthError] = useState<string | null>(null);

  const registerWithPhrase = async (username: string, phrase: string) => {
    setLoading(true);
    setAuthError(null);
    try {
      const email = usernameToEmail(username);
      const password = await derivePasswordFromPhrase(phrase);

      // Generate encryption key and keypair
      const encryptionKey = await deriveEncryptionKey(phrase, email);
      const { privateKey, publicKey } = await generateKeypair();
      const { nonce, ciphertext } = encryptPrivateKey(privateKey, strToUint8(encryptionKey));

      // Create Appwrite account
      const { account } = await signupEmailPassword(email, password, username);

      // Store encrypted private key and public key in user profile
      await updateUser(account.$id, {
        publicKey: Buffer.from(publicKey).toString('hex'),
        encryptedPrivateKey: `${Buffer.from(nonce).toString('hex')}:${Buffer.from(ciphertext).toString('hex')}`,
      });

      // Set user and keys in state
      setUser(account as any);
      setEncryptionKey(encryptionKey);
      setKeyPair(Buffer.from(publicKey).toString('hex'), Buffer.from(privateKey).toString('hex'));
      setStep('done');
    } catch (err: any) {
      setAuthError(err.message || 'Registration failed');
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const loginWithPhrase = async (username: string, phrase: string) => {
    setLoading(true);
    setAuthError(null);
    try {
      const email = usernameToEmail(username);
      const password = await derivePasswordFromPhrase(phrase);

      // Login to Appwrite
      await loginEmailPassword(email, password);
      const account = await getCurrentAccount();
      const userProfile = await findUserByUsername(username);

      if (!userProfile || !userProfile.encryptedPrivateKey || !userProfile.publicKey) {
        throw new Error('User profile is not properly configured for encryption.');
      }

      // Derive encryption key and decrypt private key
      const encryptionKey = await deriveEncryptionKey(phrase, email);
      const [nonceHex, ciphertextHex] = userProfile.encryptedPrivateKey.split(':');
      const nonce = Buffer.from(nonceHex, 'hex');
      const ciphertext = Buffer.from(ciphertextHex, 'hex');
      const privateKey = decryptPrivateKey(strToUint8(encryptionKey), nonce, ciphertext);

      // Set user and keys in state
      setUser(account as any);
      setEncryptionKey(encryptionKey);
      setKeyPair(userProfile.publicKey, Buffer.from(privateKey).toString('hex'));
      setStep('done');
    } catch (err: any) {
      setAuthError(err.message || 'Login failed');
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await zustandSignOut();
    clearKeys();
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error: error || authError,
    registerWithPhrase,
    loginWithPhrase,
    signOut,
    initializeAuth,
  };
}
