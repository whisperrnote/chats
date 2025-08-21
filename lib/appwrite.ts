import {
  Account,
  AuthenticationFactor,
  Avatars,
  Client,
  Databases,
  Functions,
  ID,
  Permission,
  Query,
  Role as AppwriteRole,
  Storage,
  AppwriteException,
} from 'appwrite';

import type * as Types from '@/types/appwrite.d';

// --- Client/Service Initialization ---
const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
export const functions = new Functions(client);

export { AppwriteRole, ID, Permission, Query, AppwriteException };

// Export the main client as 'appwrite' for backward compatibility
export { client as appwrite };

// Also export individual services
export { client };

// --- Database/Collection/Bucket IDs ---
export const DB_CORE = process.env.NEXT_PUBLIC_APPWRITE_DB_CORE_ID as string;
export const DB_EXTENSIONS = process.env.NEXT_PUBLIC_APPWRITE_DB_EXTENSIONS_ID as string;
export const COLLECTIONS = {
  USERS: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_USERS as string,
  CHATS: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CHATS as string,
  CHATMEMBERS: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CHATMEMBERS as string,
  MESSAGES: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MESSAGES as string,
  CONTACTS: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CONTACTS as string,
  DEVICES: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_DEVICES as string,
  USERNAMES: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_USERNAMES as string,
  // extensions
  BOTS: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOTS as string,
  WEB3WALLETS: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_WEB3WALLETS as string,
  INTEGRATIONS: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_INTEGRATIONS as string,
  EXTENSIONSETTINGS: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_EXTENSIONSETTINGS as string,
} as const;
export const BUCKETS = {
  USER_AVATARS: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_USER_AVATARS as string,
  CHAT_MEDIA: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_CHAT_MEDIA as string,
  BACKGROUNDS: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_BACKGROUNDS as string,
  EXTENSION_ASSETS: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_EXTENSION_ASSETS as string,
} as const;

// --- Utility: Canonize Username ---
export function canonizeUsername(username?: string): string | undefined {
  if (!username || typeof username !== 'string') return undefined;
  return username.trim().replace(/[^a-zA-Z0-9_]/g, '_').replace(/_+/g, '_').toLowerCase();
}



import { createCustomAuthClient } from '@/utils/auth';

// --- Auth & Account Methods ---

export const CUSTOM_AUTH_FUNCTION_ID = 'custom-auth';

export async function executeAuthFunction(payload: {
  action: 'register' | 'login';
  username: string;
  publicKey?: string;
  encryptedPrivateKey?: string;
}) {
  try {
    const authClient = createCustomAuthClient();
    const result = await authClient.authenticate(payload);
    
    if (!result.success) {
      throw new Error(result.error || 'Authentication failed');
    }
    
    return {
      userId: result.userId,
      secret: result.secret,
      message: result.message
    };
  } catch (error: any) {
    console.error('Custom auth error:', error);
    throw error;
  }
}

export async function createSessionFromToken(userId: string, secret: string) {
  return account.createSession(userId, secret);
}
export async function sendEmailVerification(redirectUrl: string) {
  return account.createVerification(redirectUrl);
}
export async function completeEmailVerification(userId: string, secret: string) {
  return account.updateVerification(userId, secret);
}
export async function sendPasswordRecovery(email: string, redirectUrl: string) {
  return account.createRecovery(email, redirectUrl);
}
export async function completePasswordRecovery(userId: string, secret: string, newPassword: string) {
  return account.updateRecovery(userId, secret, newPassword);
}
export async function sendMagicUrl(email: string, redirectUrl: string, userId: string = ID.unique()) {
  return account.createMagicURLToken(userId, email, redirectUrl);
}
export async function completeMagicUrlLogin(userId: string, secret: string) {
  return account.createSession(userId, secret);
}
export async function sendEmailOtp(email: string, userId: string = ID.unique(), enableSecurityPhrase = false) {
  return account.createEmailToken(userId, email, enableSecurityPhrase);
}
export async function completeEmailOtpLogin(userId: string, secret: string) {
  return account.createSession(userId, secret);
}
export async function getCurrentAccount() {
  return account.get();
}
export async function logout(sessionId?: string) {
  if (sessionId) return account.deleteSession(sessionId);
  return account.deleteSessions();
}
export async function updatePreferences(prefs: Record<string, any>) {
  return account.updatePrefs(prefs);
}
export async function getPreferences() {
  return account.getPrefs();
}
export async function listSessions() {
  return account.listSessions();
}

// --- MFA / 2FA ---
export async function generateMfaRecoveryCodes() {
  return account.createMfaRecoveryCodes();
}
export async function listMfaFactors() {
  return account.listMfaFactors();
}
export async function setMfaEnabled(enabled: boolean) {
  return account.updateMFA(enabled);
}
export async function createMfaChallenge(factor: 'totp' | 'email' | 'recoverycode') {
  // NOTE: The parameter passed to `createMfaChallenge` should match the AuthenticationFactor enum
  switch (factor) {
    case 'totp':
      return account.createMfaChallenge(AuthenticationFactor.Totp);
    case 'email':
      return account.createMfaChallenge(AuthenticationFactor.Email);
    case 'recoverycode':
      return account.createMfaChallenge(AuthenticationFactor.Recoverycode);
    default:
      throw new Error('Invalid MFA factor');
  }
}
export async function completeMfaChallenge(challengeId: string, code: string) {
  return account.updateMfaChallenge(challengeId, code);
}

// --- USERS ---

// --- Create user profile in DB with proper error handling ---
export async function createUserProfile({
  userId,
  username,
  displayName,
  email,
  publicKey,
  encryptedPrivateKey,
  status,
}: {
  userId: string;
  username: string;
  displayName: string;
  email: string;
  publicKey: string;
  encryptedPrivateKey: string;
  status?: string;
}) {
  const now = new Date().toISOString();

  // Always set status to 'offline' if missing
  if (!status) {
    console.warn('No status provided to createUserProfile, defaulting to offline');
    status = 'offline' as any; // Type assertion to handle enum conflicts
  }

  try {
    // Do not include $id or any Appwrite system fields in the data object
    const data: Record<string, any> = {
      userId,
      username: canonizeUsername(username),
      publicKey,
      createdAt: now,
      status,
    };
    if (displayName) data.displayName = displayName;
    if (email) data.email = email;
    if (encryptedPrivateKey) data.encryptedPrivateKey = encryptedPrivateKey;
    // Only include fields that are in appwrite.json schema

    const cleanData = (await import('./utils')).stripAppwriteSystemFields(data);
    return await databases.createDocument(DB_CORE, COLLECTIONS.USERS, userId, cleanData);
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
}

export async function createUser(data: Partial<Types.Users>, userId: string = ID.unique()) {
  // Always set status to 'offline' if not provided using correct enum value
  if (!data.status) {
    console.warn('No status provided to createUser, defaulting to offline');
    data.status = 'OFFLINE' as any; // Use string value directly
  }
  const cleanData = (await import('./utils')).stripAppwriteSystemFields(data);
  return databases.createDocument(DB_CORE, COLLECTIONS.USERS, userId, cleanData as any);
}
export async function getUser(userId: string): Promise<Types.Users> {
  return databases.getDocument(DB_CORE, COLLECTIONS.USERS, userId) as Promise<Types.Users>;
}
export async function updateUser(userId: string, data: Partial<Types.Users>) {
  const cleanData = (await import('./utils')).stripAppwriteSystemFields(data);
  return databases.updateDocument(DB_CORE, COLLECTIONS.USERS, userId, cleanData as any);
}
export async function deleteUser(userId: string) {
  return databases.deleteDocument(DB_CORE, COLLECTIONS.USERS, userId);
}
export async function listUsers(queries: any[] = []) {
  return databases.listDocuments(DB_CORE, COLLECTIONS.USERS, queries);
}

// --- Find user by username (canonical) ---
export async function findUserByUsername(username: string) {
  const canon = canonizeUsername(username);
  if (!canon) return null;
  const res = await databases.listDocuments(DB_CORE, COLLECTIONS.USERS, [Query.equal('username', canon)]);
  return res.documents[0] || null;
}
export async function findUserByEmail(email: string) {
  const res = await databases.listDocuments(DB_CORE, COLLECTIONS.USERS, [Query.equal('email', email)]);
  return res.documents[0] || null;
}

// --- USERNAMES ---
export async function createUsernameDoc({ username, status = 'active', lastUsedBy }: { username: string; userId?: string; status?: string; lastUsedBy?: string }) {
  const canon = canonizeUsername(username);
  if (!canon) throw new Error('Invalid username');
  // Only include fields defined in the schema
  const data: Record<string, any> = {
    username: canon,
    status: status || 'active',
  };
  if (lastUsedBy) data.lastUsedBy = lastUsedBy;
  // Optionally, you can add lastUsedAt, cooldownUntil, history if needed
  const cleanData = (await import('./utils')).stripAppwriteSystemFields(data);
  return databases.createDocument(DB_CORE, COLLECTIONS.USERNAMES, ID.unique(), cleanData);
}

export async function getUsernameDoc(username: string) {
  const canon = canonizeUsername(username);
  if (!canon) return null;
  const res = await databases.listDocuments(DB_CORE, COLLECTIONS.USERNAMES, [Query.equal('username', canon)]);
  return res.documents[0] || null;
}
export async function updateUsernameDoc(usernameId: string, data: any) {
  const cleanData = (await import('./utils')).stripAppwriteSystemFields(data);
  return databases.updateDocument(DB_CORE, COLLECTIONS.USERNAMES, usernameId, cleanData);
}
export async function listUsernames(queries: any[] = []) {
  return databases.listDocuments(DB_CORE, COLLECTIONS.USERNAMES, queries);
}

// --- CHATS ---
export async function createChat(data: Partial<Types.Chats>, chatId: string = ID.unique()) {
  const cleanData = (await import('./utils')).stripAppwriteSystemFields(data);
  return databases.createDocument(DB_CORE, COLLECTIONS.CHATS, chatId, cleanData as any);
}
export async function getChat(chatId: string): Promise<Types.Chats> {
  return databases.getDocument(DB_CORE, COLLECTIONS.CHATS, chatId) as Promise<Types.Chats>;
}
export async function updateChat(chatId: string, data: Partial<Types.Chats>) {
  const cleanData = (await import('./utils')).stripAppwriteSystemFields(data);
  return databases.updateDocument(DB_CORE, COLLECTIONS.CHATS, chatId, cleanData as any);
}
export async function deleteChat(chatId: string) {
  return databases.deleteDocument(DB_CORE, COLLECTIONS.CHATS, chatId);
}
export async function listChats(queries: any[] = []) {
  return databases.listDocuments(DB_CORE, COLLECTIONS.CHATS, queries);
}
export async function listChatsByUser(userId: string) {
  return databases.listDocuments(DB_CORE, COLLECTIONS.CHATMEMBERS, [Query.equal('userId', userId)]);
}
export async function searchChatsByTitle(userId: string, searchTerm: string) {
  const userChats = await listChatsByUser(userId);
  return userChats.documents.filter((cm) =>
    typeof cm.title === 'string' && cm.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

// --- CHAT MEMBERS ---
export async function addChatMember(data: Partial<Types.ChatMembers>, chatMemberId: string = ID.unique()) {
  const cleanData = (await import('./utils')).stripAppwriteSystemFields(data);
  return databases.createDocument(DB_CORE, COLLECTIONS.CHATMEMBERS, chatMemberId, cleanData as any);
}
export async function updateChatMember(chatMemberId: string, data: Partial<Types.ChatMembers>) {
  const cleanData = (await import('./utils')).stripAppwriteSystemFields(data);
  return databases.updateDocument(DB_CORE, COLLECTIONS.CHATMEMBERS, chatMemberId, cleanData as any);
}
export async function removeChatMember(chatMemberId: string) {
  return databases.deleteDocument(DB_CORE, COLLECTIONS.CHATMEMBERS, chatMemberId);
}
export async function listChatMembers(chatId: string) {
  return databases.listDocuments(DB_CORE, COLLECTIONS.CHATMEMBERS, [Query.equal('chatId', chatId)]);
}
export async function listUserChatMemberships(userId: string) {
  return databases.listDocuments(DB_CORE, COLLECTIONS.CHATMEMBERS, [Query.equal('userId', userId)]);
}

// --- MESSAGES ---
export async function createMessage(data: Partial<Types.Messages>, messageId: string = ID.unique()) {
  const cleanData = (await import('./utils')).stripAppwriteSystemFields(data);
  return databases.createDocument(DB_CORE, COLLECTIONS.MESSAGES, messageId, cleanData as any);
}
export async function getMessage(messageId: string): Promise<Types.Messages> {
  return databases.getDocument(DB_CORE, COLLECTIONS.MESSAGES, messageId) as Promise<Types.Messages>;
}
export async function updateMessage(messageId: string, data: Partial<Types.Messages>) {
  const cleanData = (await import('./utils')).stripAppwriteSystemFields(data);
  return databases.updateDocument(DB_CORE, COLLECTIONS.MESSAGES, messageId, cleanData as any);
}
export async function deleteMessage(messageId: string) {
  return databases.deleteDocument(DB_CORE, COLLECTIONS.MESSAGES, messageId);
}
export async function listMessages(chatId: string, queries: any[] = []) {
  return databases.listDocuments(DB_CORE, COLLECTIONS.MESSAGES, [
    Query.equal('chatId', chatId),
    ...queries,
  ]);
}
export async function listMessagesByUser(userId: string, queries: any[] = []) {
  return databases.listDocuments(DB_CORE, COLLECTIONS.MESSAGES, [
    Query.equal('senderId', userId),
    ...queries,
  ]);
}
export async function searchMessages(chatId: string, searchTerm: string) {
  const messages = await listMessages(chatId);
  return messages.documents.filter((msg) =>
    (msg as any).content?.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

// --- CONTACTS ---
export async function addContact(data: Partial<Types.Contacts>, contactId: string = ID.unique()) {
  const cleanData = (await import('./utils')).stripAppwriteSystemFields(data);
  return databases.createDocument(DB_CORE, COLLECTIONS.CONTACTS, contactId, cleanData as any);
}
export async function updateContact(contactId: string, data: Partial<Types.Contacts>) {
  const cleanData = (await import('./utils')).stripAppwriteSystemFields(data);
  return databases.updateDocument(DB_CORE, COLLECTIONS.CONTACTS, contactId, cleanData as any);
}
export async function deleteContact(contactId: string) {
  return databases.deleteDocument(DB_CORE, COLLECTIONS.CONTACTS, contactId);
}
export async function listContacts(ownerId: string) {
  return databases.listDocuments(DB_CORE, COLLECTIONS.CONTACTS, [Query.equal('ownerId', ownerId)]);
}

// --- DEVICES ---
export async function addDevice(data: Partial<Types.Devices>, deviceId: string = ID.unique()) {
  const cleanData = (await import('./utils')).stripAppwriteSystemFields(data);
  return databases.createDocument(DB_CORE, COLLECTIONS.DEVICES, deviceId, cleanData as any);
}
export async function updateDevice(deviceId: string, data: Partial<Types.Devices>) {
  const cleanData = (await import('./utils')).stripAppwriteSystemFields(data);
  return databases.updateDocument(DB_CORE, COLLECTIONS.DEVICES, deviceId, cleanData as any);
}
export async function deleteDevice(deviceId: string) {
  return databases.deleteDocument(DB_CORE, COLLECTIONS.DEVICES, deviceId);
}
export async function listDevices(userId: string) {
  return databases.listDocuments(DB_CORE, COLLECTIONS.DEVICES, [Query.equal('userId', userId)]);
}

// --- EXTENSIONS (Bots, Web3Wallets, Integrations, ExtensionSettings) ---
export async function createExtensionDoc(collection: keyof typeof COLLECTIONS, data: any, docId: string = ID.unique()) {
  return databases.createDocument(DB_EXTENSIONS, COLLECTIONS[collection], docId, data);
}
export async function updateExtensionDoc(collection: keyof typeof COLLECTIONS, docId: string, data: any) {
  return databases.updateDocument(DB_EXTENSIONS, COLLECTIONS[collection], docId, data);
}
export async function deleteExtensionDoc(collection: keyof typeof COLLECTIONS, docId: string) {
  return databases.deleteDocument(DB_EXTENSIONS, COLLECTIONS[collection], docId);
}
export async function listExtensionDocs(collection: keyof typeof COLLECTIONS, queries: any[] = []) {
  return databases.listDocuments(DB_EXTENSIONS, COLLECTIONS[collection], queries);
}

// --- Utility: Get Document (Generic) ---
export async function getDocument<T>(dbId: string, collectionId: string, docId: string): Promise<T> {
  return databases.getDocument(dbId, collectionId, docId) as Promise<T>;
}

// --- Utility: List Documents (Generic) ---
export async function listDocuments(dbId: string, collectionId: string, queries: any[] = []) {
  return databases.listDocuments(dbId, collectionId, queries);
}

// --- Utility: Update Document (Generic) ---
export async function updateDocument(dbId: string, collectionId: string, docId: string, data: any) {
  return databases.updateDocument(dbId, collectionId, docId, data);
}

// --- Utility: Delete Document (Generic) ---
export async function deleteDocument(dbId: string, collectionId: string, docId: string) {
  return databases.deleteDocument(dbId, collectionId, docId);
}

// --- Permissions Helper Example ---
export function privateDocPermissions(userId: string) {
  return [
    Permission.read(AppwriteRole.user(userId)),
    Permission.update(AppwriteRole.user(userId)),
    Permission.delete(AppwriteRole.user(userId)),
  ];
}

// --- Essential Auth Utilities ---
export async function isAuthenticated(): Promise<boolean> {
  try {
    await getCurrentAccount();
    return true;
  } catch {
    return false;
  }
}

export async function getCurrentUserId(): Promise<string | null> {
  try {
    const user = await getCurrentAccount();
    // @ts-ignore -- Appwrite get() returns a User object with $id
    return user.$id || null;
  } catch {
    return null;
  }
}

// --- Chat Utilities ---
export async function getChatWithMembers(chatId: string) {
  const [chat, members] = await Promise.all([
    getChat(chatId),
    listChatMembers(chatId)
  ]);
  return { ...chat, members: members.documents };
}

export async function getMessagesForChat(chatId: string, limit = 50) {
  return listMessages(chatId, [
    Query.orderDesc('createdAt'),
    Query.limit(limit)
  ]);
}

// --- Real-time Subscriptions ---
export function subscribeToChat(chatId: string, callback: (payload: any) => void) {
  // Note: .subscribe() is available on the 'client' only for realtime if enabled in Appwrite SDK
  return client.subscribe(`databases.${DB_CORE}.collections.${COLLECTIONS.MESSAGES}.documents.${chatId}`, callback);
}

export function subscribeToUserChats(userId: string, callback: (payload: any) => void) {
  return client.subscribe(`databases.${DB_CORE}.collections.${COLLECTIONS.CHATMEMBERS}.documents.${userId}`, callback);
}

// --- User Profile Management ---
export async function getCurrentUserProfile(): Promise<Types.Users | null> {
  try {
    const accountData = await getCurrentAccount();
    const profile = await getUser(accountData.$id);
    return profile;
  } catch (error) {
    console.error('Failed to get user profile:', error);
    return null;
  }
}

export async function updateUserProfile(data: Partial<Types.Users>) {
  const userId = await getCurrentUserId();
  if (!userId) throw new Error('Not authenticated');
  return updateUser(userId, data);
}

// --- Storage: Avatars, Media, Backgrounds, Extensions ---
export async function uploadFile(bucketId: string, file: File, fileId: string = ID.unique(), permissions: string[] = []) {
  return storage.createFile(bucketId, fileId, file, permissions);
}
export async function getFilePreview(bucketId: string, fileId: string) {
  return storage.getFilePreview(bucketId, fileId);
}
export async function getFileDownload(bucketId: string, fileId: string) {
  return storage.getFileDownload(bucketId, fileId);
}
export async function deleteFile(bucketId: string, fileId: string) {
  return storage.deleteFile(bucketId, fileId);
}
export async function listFiles(bucketId: string, queries: any[] = []) {
  return storage.listFiles(bucketId, queries);
}

export default client;