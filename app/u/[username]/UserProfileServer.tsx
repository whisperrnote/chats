import UserProfileClient from './UserProfileClient';
import { findUserByUsername } from '@/lib/appwrite';

export default async function UserProfileServer({ username }: { username: string }) {
  let user = null;
  let error = null;
  try {
    user = await findUserByUsername(username);
    if (!user) error = 'User not found';
  } catch {
    error = 'Failed to load user';
  }
  return <UserProfileClient user={user} error={error} />;
}
