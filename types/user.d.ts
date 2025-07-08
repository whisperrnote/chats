export type UserStatus = 'online' | 'offline' | 'away';

export type CredibilityTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

export interface CredibilityHistoryEntry {
  event: string;
  scoreChange: number;
  timestamp: string;
}

export interface User {
  userId: string;
  username: string;
  displayName?: string;
  avatarUrl?: string;
  bio?: string;
  phone?: string;
  email?: string;
  publicKey: string;
  createdAt: string;
  lastSeen: string;
  status: UserStatus;
  usernameCredibility: number;
  usernameHistory: string[];
  usernameChangedAt?: string;
  credibilityTier: CredibilityTier;
  credibilityScore: number;
  credibilityHistory: CredibilityHistoryEntry[];
  twoFactorEnabled: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  encryptionKeyExported: boolean;
  recoveryPhraseBackedUp: boolean;
  encryptedPrivateKey: string;
}
