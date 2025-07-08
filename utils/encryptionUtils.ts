```typescript
export function encryptText(text: string, key: string): string {
  // TODO: Implement real encryption
  return btoa(text);
}

export function decryptText(cipher: string, key: string): string {
  // TODO: Implement real decryption
  return atob(cipher);
}
```