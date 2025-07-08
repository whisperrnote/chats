export interface CredibilityHistoryEntry {
  event: string;
  scoreChange: number;
  timestamp: string;
}

export type CredibilityTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

export interface Credibility {
  score: number;
  tier: CredibilityTier;
  history: CredibilityHistoryEntry[];
}
