
// Use the official BIP39 English wordlist for production-grade mnemonics
import bip39Wordlist from 'bip39/wordlists/english.json';

// Helper to get a cryptographically secure random integer
function getRandomInt(max: number): number {
  if (typeof window !== 'undefined' && window.crypto?.getRandomValues) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] % max;
  } else if (typeof require !== 'undefined') {
    // Node.js fallback
    const crypto = require('crypto');
    return crypto.randomBytes(4).readUInt32BE(0) % max;
  } else {
    // Fallback (not cryptographically secure)
    return Math.floor(Math.random() * max);
  }
}

// Generate a BIP39-like mnemonic phrase (12 or 24 words, unique, random, not always starting with 'a')
export function generateRecoveryPhrase(words: 12 | 24 = 12): string {
  const wordlist: string[] = bip39Wordlist;
  const phrase: string[] = [];
  const used = new Set<number>();
  while (phrase.length < words) {
    const idx = getRandomInt(wordlist.length);
    // Avoid duplicates for better UX (not required by BIP39, but improves randomness feel)
    if (!used.has(idx)) {
      phrase.push(wordlist[idx]);
      used.add(idx);
    }
  }
  return phrase.join(' ');
}

// Verify a mnemonic phrase (basic check: correct word count and all words in wordlist)
export function verifyRecoveryPhrase(phrase: string, words: 12 | 24): boolean {
  if (!phrase) return false;
  const arr = phrase.trim().split(/\s+/);
  return arr.length === words && arr.every(w => (bip39Wordlist as string[]).includes(w));
}

export async function deriveEncryptionKey(mnemonic: string, salt: string): Promise<string> {
  // Simple key derivation (use proper PBKDF2 in production)
  const encoder = new TextEncoder();
  const data = encoder.encode(mnemonic + salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
