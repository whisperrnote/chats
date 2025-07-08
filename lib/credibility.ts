export function calculateCredibilityScore(events: any[]): number {
  // TODO: Implement real credibility calculation
  return 100;
}

export function getCredibilityTier(score: number): 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond' {
  if (score >= 90) return 'diamond';
  if (score >= 75) return 'platinum';
  if (score >= 60) return 'gold';
  if (score >= 40) return 'silver';
  return 'bronze';
}