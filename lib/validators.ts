export function isEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isPhone(phone: string): boolean {
  return /^\+?[0-9]{7,20}$/.test(phone);
}

export function isStrongPassword(password: string): boolean {
  // TODO: Implement real password strength check
  return password.length >= 8;
}