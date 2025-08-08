// lib/e2ee.ts
// E2EE session management: key storage, unlock, encrypt/decrypt user data
import {
  deriveKeyFromPhrase,
  generateKeypair,
  encryptPrivateKey,
  decryptPrivateKey,
  encryptAESGCM,
  decryptAESGCM,
  strToUint8,
  uint8ToStr
} from './crypto';

// --- Types ---
export type EncryptedPrivateKey = {
  nonce: Uint8Array;
  ciphertext: Uint8Array;
};

export type E2EEKeys = {
  publicKey: Uint8Array;
  privateKey: Uint8Array;
};

// --- Signup: Generate keys and encrypt private key with phrase ---
export async function createE2EEKeysAndEncryptPrivateKey(phrase: string, salt: string) {
  const { privateKey, publicKey } = await generateKeypair();
  const kdfKey = await deriveKeyFromPhrase(phrase, salt);
  const { nonce, ciphertext } = encryptPrivateKey(privateKey, kdfKey);
  return {
    publicKey,
    encryptedPrivateKey: { nonce, ciphertext }
  };
}

// --- Login: Unlock private key with phrase ---
export async function unlockPrivateKeyFromPhrase(
  phrase: string,
  salt: string,
  encrypted: EncryptedPrivateKey
): Promise<E2EEKeys> {
  const kdfKey = await deriveKeyFromPhrase(phrase, salt);
  const privateKey = decryptPrivateKey(kdfKey, encrypted.nonce, encrypted.ciphertext);
  // Public key can be derived from private key
  const publicKey = await generatePublicKey(privateKey);
  return { privateKey, publicKey };
}

// --- Utility: Derive public key from private key ---
export async function generatePublicKey(privateKey: Uint8Array): Promise<Uint8Array> {
  return await import('@noble/ed25519').then(ed => ed.getPublicKeyAsync(privateKey));
}

// --- Encrypt/Decrypt arbitrary data (e.g. profile fields, messages) ---
export function encryptData(key: Uint8Array, plaintext: string): { nonce: Uint8Array; ciphertext: Uint8Array } {
  return encryptAESGCM(key, strToUint8(plaintext));
}

export function decryptData(key: Uint8Array, nonce: Uint8Array, ciphertext: Uint8Array): string {
  const decrypted = decryptAESGCM(key, nonce, ciphertext);
  return uint8ToStr(decrypted);
}
