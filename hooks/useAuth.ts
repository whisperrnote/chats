import { useState } from 'react';

export function useAuth() {
  // Placeholder state
  const [user, setUser] = useState(null);

  return {
    user,
    login: () => {/* TODO: implement login */},
    logout: () => {/* TODO: implement logout */},
    register: () => {/* TODO: implement register */},
    loading: false,
    error: null,
  };
}
