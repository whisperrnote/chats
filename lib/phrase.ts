// Simple phrase generator/validator (replace with secure implementation in production)

const WORD_LIST = [
  // ...a list of BIP39 words or similar...
  'apple', 'banana', 'cat', 'dog', 'elephant', 'fish', 'grape', 'hat', 'ice', 'jungle', 'kite', 'lemon', 'moon', 'nest', 'orange', 'pear', 'queen', 'rose', 'star', 'tree', 'umbrella', 'violet', 'wolf', 'xray', 'yarn', 'zebra'
];

export function generateRecoveryPhrase(words: 12 | 24): string {
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
