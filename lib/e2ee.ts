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
// Instead of generating a keypair, just encrypt the username with the phrase-derived key
export async function createE2EEKeysAndEncryptUsername(phrase: string, username: string) {
  const kdfKey = await deriveKeyFromPhrase(phrase, username);
  const { nonce, ciphertext } = encryptAESGCM(kdfKey, strToUint8(username));
  // Store as base64 string for Appwrite
  return {
    encryptedUsername: JSON.stringify({
      nonce: Buffer.from(nonce).toString('base64'),
      ciphertext: Buffer.from(ciphertext).toString('base64'),
    })
  };
}

// --- Login: Unlock private key with phrase ---
// Decrypt the encrypted username and check if it matches
export async function verifyPhraseWithEncryptedUsername(
  phrase: string,
  username: string,
  encrypted: string
): Promise<boolean> {
  const kdfKey = await deriveKeyFromPhrase(phrase, username);
  let parsed;
  try {
    parsed = JSON.parse(encrypted);
  } catch {
    return false;
  }
  const nonce = Buffer.from(parsed.nonce, 'base64');
  const ciphertext = Buffer.from(parsed.ciphertext, 'base64');
  try {
    const decrypted = decryptAESGCM(kdfKey, nonce, ciphertext);
    return uint8ToStr(decrypted) === username;
  } catch {
    return false;
  }
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
