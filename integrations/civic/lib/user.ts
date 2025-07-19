import { getUser as getCivicUser } from '@civic/auth-web3/nextjs';

// import { AppwriteClient } from "@appwrite/sdk" // Uncomment and configure when ready

/**
 * Get the authenticated user from Civic.
 * In the future, extend this to fetch Appwrite user data as well.
 */
export async function getUser() {
  const civicUser = await getCivicUser()
  if (!civicUser) return null

  // Placeholder for future Appwrite integration:
  // const appwriteUser = await AppwriteClient.getUserById(civicUser.id)
  // return { ...civicUser, appwrite: appwriteUser }

  return civicUser
}
