'use client';
import { useAuthFlow } from '@/store/authFlow';

export default function AuthFlowTest() {
  const state = useAuthFlow();
  return <pre>{JSON.stringify(state, null, 2)}</pre>;
}
