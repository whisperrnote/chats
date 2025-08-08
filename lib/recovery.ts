// recovery.ts

export function generateRecoveryPhrase(): string[] {
  // TODO: Use a real BIP39 or similar wordlist
  return Array.from({ length: 24 }, (_, i) => `word${i + 1}`);
}

export function verifyRecoveryPhrase(phrase: string[]): boolean {
  // TODO: Implement real verification
  return phrase.length === 24;
}
