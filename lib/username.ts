export function isValidUsername(username: string): boolean {
  // TODO: Add real validation logic
  return /^[a-zA-Z0-9_]{3,32}$/.test(username);
}

export function normalizeUsername(username: string): string {
  return username.trim().toLowerCase();
}