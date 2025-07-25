// Professional BIP39 mnemonic utilities using the official bip39 package

import * as bip39 from 'bip39';
import { pbkdf2Sync } from 'crypto';

/**
 * Generate a BIP39-compliant mnemonic phrase (12 or 24 words)
 * @param words The number of words in the mnemonic (12 or 24)
 * @returns The mnemonic phrase as a string
 */
export function generateRecoveryPhrase(words: 12 | 24 = 12): string {
  const strength = words === 12 ? 128 : 256;
  return bip39.generateMnemonic(strength);
}

/**
 * Validate a mnemonic phrase (BIP39 standard)
 * @param phrase The mnemonic phrase to verify
 * @param words The expected number of words (12 or 24)
 * @returns True if valid, false otherwise
 */
export function verifyRecoveryPhrase(phrase: string, words: 12 | 24): boolean {
  if (!phrase) return false;
  const arr = phrase.trim().split(/\s+/);
  if (arr.length !== words) return false;
  return bip39.validateMnemonic(phrase);
}

/**
 * Derive a key from a BIP39 mnemonic and salt using PBKDF2 (standard SCRYPT alternative)
 * @param mnemonic The BIP39 mnemonic phrase
 * @param salt The salt to use for derivation
 * @returns The derived key as a hex string
 */
export async function deriveEncryptionKey(
  mnemonic: string,
  salt: string
): Promise<string> {
  // Use PBKDF2 with 2048 iterations, SHA512, 64 bytes output (BIP39 standard)
  return new Promise((resolve, reject) => {
    try {
      const key = pbkdf2Sync(
        mnemonic.normalize('NFKD'),
        ('mnemonic' + salt).normalize('NFKD'),
        2048,
        64,
        'sha512'
      );
      resolve(key.toString('hex'));
    } catch (e) {
      reject(e);
    }
  });
}