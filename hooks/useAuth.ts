import { useState } from 'react';
import {
  deriveEncryptionKey,
} from '@/lib/phrase';
import {
  generateKeypair,
  encryptPrivateKey,
  decryptPrivateKey,
  strToUint8,
} from '@/lib/crypto';
import {
  findUserByUsername,
  getCurrentAccount,
  executeAuthFunction,
  createSessionFromToken,
  logout,
  canonizeUsername,
} from '@/lib/appwrite';
import { useAuth as useZustandAuth } from '@/store/auth';
import { useEncryption } from '@/store/encryption';
import { useAuthFlow } from '@/store/authFlow';
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
  const { setStep } = useAuthFlow();
  const [authError, setAuthError] = useState<string | null>(null);

  const registerWithPhrase = async (username: string, phrase: string) => {
    setLoading(true);
    setAuthError(null);
    try {
      const email = usernameToEmail(username);

      // Generate encryption key and keypair (this remains on client for E2EE)
      const encryptionKey = await deriveEncryptionKey(phrase, email);
      const { privateKey, publicKey } = await generateKeypair();
      const { nonce, ciphertext } = encryptPrivateKey(privateKey, strToUint8(encryptionKey));

      const publicKeyHex = Buffer.from(publicKey).toString('hex');
      const encryptedPrivateKeyHex = `${Buffer.from(nonce).toString('hex')}:${Buffer.from(ciphertext).toString('hex')}`;

      // Call backend function to register user and get a custom token
      const token = await executeAuthFunction({
        action: 'register',
        username,
        publicKey: publicKeyHex,
        encryptedPrivateKey: encryptedPrivateKeyHex,
      });

      // Use the token to create a session
      await createSessionFromToken(token.userId, token.secret);
      const account = await getCurrentAccount();

      // Set user and keys in state
      setUser(account as any);
      setEncryptionKey(encryptionKey);
      setKeyPair(publicKeyHex, Buffer.from(privateKey).toString('hex'));
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

      // Get a custom token from the backend. No password/phrase check on server.
      const token = await executeAuthFunction({ action: 'login', username });

      // Create Appwrite session
      await createSessionFromToken(token.userId, token.secret);
      const account = await getCurrentAccount();
      const userProfile = await findUserByUsername(username);

      if (!userProfile || !userProfile.encryptedPrivateKey || !userProfile.publicKey) {
        throw new Error('User profile is not properly configured for encryption.');
      }

      // Derive encryption key and try to decrypt private key.
      // This is the client-side validation that the phrase is correct.
      const encryptionKey = await deriveEncryptionKey(phrase, email);
      const [nonceHex, ciphertextHex] = userProfile.encryptedPrivateKey.split(':');
      const nonce = Buffer.from(nonceHex, 'hex');
      const ciphertext = Buffer.from(ciphertextHex, 'hex');

      let privateKey;
      try {
        privateKey = decryptPrivateKey(strToUint8(encryptionKey), nonce, ciphertext);
      } catch (e) {
        // Decryption failed! This means the phrase was wrong.
        await logout(); // Log out from the invalid session
        throw new Error("Invalid recovery phrase. Please check and try again.");
      }

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
