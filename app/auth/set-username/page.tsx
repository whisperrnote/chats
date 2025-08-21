'use client';
import SetUsername from '@/components/auth/SetUsername';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SetUsernamePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If the user is loaded and they have a non-temporary username,
    // they don't belong here, so redirect them to the app.
    if (!isLoading && user && !user.name.startsWith('user-')) {
      router.replace('/app');
    }
    // If the user is not authenticated, redirect to the auth page.
    if (!isLoading && !user) {
        router.replace('/auth');
    }
  }, [user, isLoading, router]);

  // While loading, or if user is not yet available, show a loading state or nothing
  if (isLoading || !user) {
    return <div>Loading...</div>; // Or a proper loading spinner
  }

  // If the user has a temporary name, show the component to set a new one
  if (user.name.startsWith('user-')) {
    return <SetUsername />;
  }

  // Fallback, should ideally not be reached if logic is correct
  return <div>Loading...</div>;
}
