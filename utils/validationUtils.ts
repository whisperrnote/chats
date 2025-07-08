export function isEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isStrongPassword(password: string): boolean {
  // TODO: Implement real password strength check
  return password.length >= 8;
}

export function isUsername(username: string): boolean {
  return /^[a-zA-Z0-9_]{3,32}$/.test(username);
}