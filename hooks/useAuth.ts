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

  const authenticateWithPhrase = async (phrase: string, username?: string) => {
    setLoading(true);
    setAuthError(null);
    try {
      // If username is provided, it's a login attempt.
      if (username) {
        await loginWithPhrase(username, phrase);
      } else {
        // If no username, it's a registration attempt.
        await registerWithPhrase(phrase);
      }
    } catch (err: any) {
      setAuthError(err.message || 'Authentication failed');
      setError(err.message || 'Authentication failed');
      // Re-throw the error so the UI can catch it if needed
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // This is now an internal function called by authenticateWithPhrase
  const registerWithPhrase = async (phrase: string) => {
    // This is a simplified registration flow.
    // A temporary username is created. The user will be prompted to set a real one after logging in.
    const tempUsername = `user-${Date.now()}`;
    const email = usernameToEmail(tempUsername);

    // Generate encryption key and keypair (this remains on client for E2EE)
    const encryptionKey = await deriveEncryptionKey(phrase, email);
    const { privateKey, publicKey } = await generateKeypair();
    const { nonce, ciphertext } = encryptPrivateKey(privateKey, strToUint8(encryptionKey));

    const publicKeyHex = Buffer.from(publicKey).toString('hex');
    const encryptedPrivateKeyHex = `${Buffer.from(nonce).toString('hex')}:${Buffer.from(ciphertext).toString('hex')}`;

    // Call backend function to register user and get a custom token
    const token = await executeAuthFunction({
      action: 'register',
      username: tempUsername,
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
    // The UI will now check if user.name is a temp name and prompt for a new one.
  };

  // This is now an internal function called by authenticateWithPhrase
  const loginWithPhrase = async (username: string, phrase: string) => {
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
  };

  const registerWithPasskey = async () => {
    // To be implemented
    setAuthError('Passkey registration is not yet implemented.');
    throw new Error('Passkey registration is not yet implemented.');
  };

  const loginWithPasskey = async () => {
    // To be implemented
    setAuthError('Passkey login is not yet implemented.');
    throw new Error('Passkey login is not yet implemented.');
  };


  const updateUsername = async (newUsername: string) => {
    setLoading(true);
    setAuthError(null);
    try {
      await updateUserUsername(newUsername);
      // Refetch user to get the new username
      const account = await getCurrentAccount();
      setUser(account as any);
    } catch (err: any) {
      setAuthError(err.message || 'Failed to update username');
      throw err;
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
    authenticateWithPhrase,
    registerWithPasskey,
    loginWithPasskey,
    updateUsername,
    signOut,
    initializeAuth,
  };
}
