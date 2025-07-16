import * as bip39 from 'bip39';
import { pbkdf2Sync } from 'crypto-browserify';

// Simple phrase generator/validator (replace with BIP39 in production)
const WORD_LIST = [
  'abandon', 'ability', 'able', 'about', 'above', 'absent', 'absorb', 'abstract',
  'absurd', 'abuse', 'access', 'accident', 'account', 'accuse', 'achieve', 'acid',
  'acoustic', 'acquire', 'across', 'act', 'action', 'actor', 'actress', 'actual',
  'adapt', 'add', 'addict', 'address', 'adjust', 'admit', 'adult', 'advance',
  'advice', 'aerobic', 'affair', 'afford', 'afraid', 'again', 'against', 'age',
  'agent', 'agree', 'ahead', 'aim', 'air', 'airport', 'aisle', 'alarm',
  'album', 'alcohol', 'alert', 'alien', 'all', 'alley', 'allow', 'almost',
  // ... add more words or use actual BIP39 wordlist
];

export function generateRecoveryPhrase(words: 12 | 24 = 12): string {
  const arr = [];
  for (let i = 0; i < words; i++) {
    arr.push(WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]);
  }
  return arr.join(' ');
}

export function verifyRecoveryPhrase(phrase: string, words: 12 | 24): boolean {
  if (!phrase) return false;
  const arr = phrase.trim().split(/\s+/);
  return arr.length === words && arr.every(w => WORD_LIST.includes(w));
}

export async function deriveEncryptionKey(mnemonic: string, salt: string): Promise<string> {
  // Simple key derivation (use proper PBKDF2 in production)
  const encoder = new TextEncoder();
  const data = encoder.encode(mnemonic + salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
