// lib/crypto.ts
// All cryptographic primitives for E2EE: key derivation, keypair, encryption, decryption
// Uses @noble/ed25519, @noble/ciphers, @noble/hashes

import * as ed25519 from '@noble/ed25519';
import { gcm } from '@noble/ciphers/aes.js';
import { randomBytes } from '@noble/ciphers/webcrypto.js';
import { scrypt } from '@noble/hashes/scrypt.js';

// --- Key Derivation ---
export async function deriveKeyFromPhrase(phrase: string, salt: string): Promise<Uint8Array> {
  // Use scrypt for KDF (Argon2id is not available in noble yet)
  // N: 2^18 (~256MB RAM), r: 8, p: 1, dkLen: 32
  return scrypt(phrase, salt, { N: 2 ** 18, r: 8, p: 1, dkLen: 32 });
}

// --- Asymmetric Keypair Generation ---
export async function generateKeypair(): Promise<{ privateKey: Uint8Array; publicKey: Uint8Array }> {
  const privateKey = ed25519.utils.randomPrivateKey();
  const publicKey = await ed25519.getPublicKeyAsync(privateKey);
  return { privateKey, publicKey };
}

// --- AES-GCM Encryption/Decryption ---
export function encryptAESGCM(key: Uint8Array, plaintext: Uint8Array): { nonce: Uint8Array; ciphertext: Uint8Array } {
  const nonce = randomBytes(12); // 96-bit nonce for AES-GCM
  const cipher = gcm(key, nonce);
  const ciphertext = cipher.encrypt(plaintext);
  return { nonce, ciphertext };
}

export function decryptAESGCM(key: Uint8Array, nonce: Uint8Array, ciphertext: Uint8Array): Uint8Array {
  const cipher = gcm(key, nonce);
  return cipher.decrypt(ciphertext);
}

// --- Encrypt/Decrypt Private Key with Phrase-derived Key ---
export function encryptPrivateKey(privateKey: Uint8Array, key: Uint8Array): { nonce: Uint8Array; ciphertext: Uint8Array } {
  return encryptAESGCM(key, privateKey);
}

export function decryptPrivateKey(key: Uint8Array, nonce: Uint8Array, ciphertext: Uint8Array): Uint8Array {
  return decryptAESGCM(key, nonce, ciphertext);
}

// --- Utility: String <-> Uint8Array ---
export function strToUint8(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}
export function uint8ToStr(arr: Uint8Array): string {
  return new TextDecoder().decode(arr);
}
