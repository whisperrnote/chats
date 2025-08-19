import { useAuth as useZustandAuth } from '@/store/auth';

export function useAuth() {
  return useZustandAuth();
}
