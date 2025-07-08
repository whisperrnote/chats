import { useState } from 'react';

export function useRecovery() {
  const [recoveryStatus, setRecoveryStatus] = useState(null);

  return {
    recoveryStatus,
    startRecovery: () => {/* TODO: implement start recovery */},
    confirmRecovery: () => {/* TODO: implement confirm recovery */},
    loading: false,
    error: null,
  };
}
