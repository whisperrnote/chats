```typescript
export function encrypt(data: string, key: string): string {
  // TODO: Implement real encryption
  return btoa(data);
}

export function decrypt(data: string, key: string): string {
  // TODO: Implement real decryption
  return atob(data);
}
```