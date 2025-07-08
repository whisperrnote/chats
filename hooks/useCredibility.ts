import { useState } from 'react';

export function useCredibility() {
  const [credibility, setCredibility] = useState({ score: 100, tier: 'bronze' });

  return {
    credibility,
    refreshCredibility: () => {/* TODO: implement refresh credibility */},
    loading: false,
    error: null,
  };
}
