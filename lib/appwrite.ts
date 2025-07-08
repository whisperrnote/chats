import {
  Client, Account, Databases, Storage, Avatars, ID, Query, Permission, Role as AppwriteRole
} from 'appwrite';
import type * as Types from '../types/appwrite.d';

// --- Client/Service Initialization ---
const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

export { ID, Query, Permission, AppwriteRole };

// --- Database/Collection/Bucket IDs ---
export const DB_CORE = process.env.NEXT_PUBLIC_APPWRITE_DB_CORE_ID!;
export const DB_EXTENSIONS = process.env.NEXT_PUBLIC_APPWRITE_DB_EXTENSIONS_ID!;
export const COLLECTIONS = {
  USERS: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_USERS!,
  CHATS: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CHATS!,
  CHATMEMBERS: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CHATMEMBERS!,
  MESSAGES: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MESSAGES!,
  CONTACTS: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CONTACTS!,
  DEVICES: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_DEVICES!,
  USERNAMES: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_USERNAMES!,
  // extensions
  BOTS: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOTS!,
  WEB3WALLETS: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_WEB3WALLETS!,
  INTEGRATIONS: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_INTEGRATIONS!,
  EXTENSIONSETTINGS: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_EXTENSIONSETTINGS!,
} as const;
export const BUCKETS = {
  USER_AVATARS: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_USER_AVATARS!,
  CHAT_MEDIA: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_CHAT_MEDIA!,
  BACKGROUNDS: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_BACKGROUNDS!,
  EXTENSION_ASSETS: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_EXTENSION_ASSETS!,
} as const;

// --- Auth & Account Methods ---

export async function signupEmailPassword(email: string, password: string, name: string, userId: string = ID.unique()) {
  return account.create(userId, email, password, name);
}
export async function loginEmailPassword(email: string, password: string) {
  return account.createEmailPasswordSession(email, password);
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
  return account.createMfaChallenge(factor);
}
export async function completeMfaChallenge(challengeId: string, code: string) {
  return account.updateMfaChallenge(challengeId, code);
}

// --- USERS ---
export async function createUser(data: Partial<Types.Users>, userId: string = ID.unique()) {
  return databases.createDocument(DB_CORE, COLLECTIONS.USERS, userId, data);
}
export async function getUser(userId: string): Promise<Types.Users> {
  return databases.getDocument(DB_CORE, COLLECTIONS.USERS, userId) as Promise<Types.Users>;
}
export async function updateUser(userId: string, data: Partial<Types.Users>) {
  return databases.updateDocument(DB_CORE, COLLECTIONS.USERS, userId, data);
}
export async function deleteUser(userId: string) {
  return databases.deleteDocument(DB_CORE, COLLECTIONS.USERS, userId);
}
export async function listUsers(queries: any[] = []) {
  return databases.listDocuments(DB_CORE, COLLECTIONS.USERS, queries);
}
export async function findUserByUsername(username: string) {
  const canon = canonizeUsername(username);
  const res = await databases.listDocuments(DB_CORE, COLLECTIONS.USERS, [Query.equal('username', canon)]);
  return res.documents[0] || null;
}
export async function findUserByEmail(email: string) {
  const res = await databases.listDocuments(DB_CORE, COLLECTIONS.USERS, [Query.equal('email', email)]);
  return res.documents[0] || null;
}

// --- USERNAMES ---
export async function getUsernameDoc(username: string) {
  const canon = canonizeUsername(username);
  const res = await databases.listDocuments(DB_CORE, COLLECTIONS.USERNAMES, [Query.equal('username', canon)]);
  return res.documents[0] || null;
}
export async function updateUsernameDoc(usernameId: string, data: any) {
  return databases.updateDocument(DB_CORE, COLLECTIONS.USERNAMES, usernameId, data);
}

// --- CHATS ---
export async function createChat(data: Partial<Types.Chats>, chatId: string = ID.unique()) {
  return databases.createDocument(DB_CORE, COLLECTIONS.CHATS, chatId, data);
}
export async function getChat(chatId: string): Promise<Types.Chats> {
  return databases.getDocument(DB_CORE, COLLECTIONS.CHATS, chatId) as Promise<Types.Chats>;
}
export async function updateChat(chatId: string, data: Partial<Types.Chats>) {
  return databases.updateDocument(DB_CORE, COLLECTIONS.CHATS, chatId, data);
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

// --- CHAT MEMBERS ---
export async function addChatMember(data: Partial<Types.ChatMembers>, chatMemberId: string = ID.unique()) {
  return databases.createDocument(DB_CORE, COLLECTIONS.CHATMEMBERS, chatMemberId, data);
}
export async function updateChatMember(chatMemberId: string, data: Partial<Types.ChatMembers>) {
  return databases.updateDocument(DB_CORE, COLLECTIONS.CHATMEMBERS, chatMemberId, data);
}
export async function removeChatMember(chatMemberId: string) {
  return databases.deleteDocument(DB_CORE, COLLECTIONS.CHATMEMBERS, chatMemberId);
}
export async function listChatMembers(chatId: string) {
  return databases.listDocuments(DB_CORE, COLLECTIONS.CHATMEMBERS, [Query.equal('chatId', chatId)]);
}

// --- MESSAGES ---
export async function createMessage(data: Partial<Types.Messages>, messageId: string = ID.unique()) {
  return databases.createDocument(DB_CORE, COLLECTIONS.MESSAGES, messageId, data);
}
export async function getMessage(messageId: string): Promise<Types.Messages> {
  return databases.getDocument(DB_CORE, COLLECTIONS.MESSAGES, messageId) as Promise<Types.Messages>;
}
export async function updateMessage(messageId: string, data: Partial<Types.Messages>) {
  return databases.updateDocument(DB_CORE, COLLECTIONS.MESSAGES, messageId, data);
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

// --- CONTACTS ---
export async function addContact(data: Partial<Types.Contacts>, contactId: string = ID.unique()) {
  return databases.createDocument(DB_CORE, COLLECTIONS.CONTACTS, contactId, data);
}
export async function updateContact(contactId: string, data: Partial<Types.Contacts>) {
  return databases.updateDocument(DB_CORE, COLLECTIONS.CONTACTS, contactId, data);
}
export async function deleteContact(contactId: string) {
  return databases.deleteDocument(DB_CORE, COLLECTIONS.CONTACTS, contactId);
}
export async function listContacts(ownerId: string) {
  return databases.listDocuments(DB_CORE, COLLECTIONS.CONTACTS, [Query.equal('ownerId', ownerId)]);
}

// --- DEVICES ---
export async function addDevice(data: Partial<Types.Devices>, deviceId: string = ID.unique()) {
  return databases.createDocument(DB_CORE, COLLECTIONS.DEVICES, deviceId, data);
}
export async function updateDevice(deviceId: string, data: Partial<Types.Devices>) {
  return databases.updateDocument(DB_CORE, COLLECTIONS.DEVICES, deviceId, data);
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

// --- Utility: Canonize Username ---
export function canonizeUsername(username?: string): string | undefined {
  if (!username || typeof username !== 'string') return undefined;
  return username.trim().replace(/[^a-zA-Z0-9_]/g, '_').replace(/_+/g, '_').toLowerCase();
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

export default client;
