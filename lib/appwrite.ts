import { Client, Account, Databases, Storage, Avatars, ID, Query, Permission, Role as AppwriteRole } from 'appwrite';
import type * as Types from '../types/appwrite.d';

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

export { ID, Query, Permission, AppwriteRole };

// Database IDs
export const DB_CORE = process.env.NEXT_PUBLIC_APPWRITE_DB_CORE_ID!;
export const DB_EXTENSIONS = process.env.NEXT_PUBLIC_APPWRITE_DB_EXTENSIONS_ID!;

// Collection IDs (core)
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

// --- Example: User CRUD ---

export async function getUser(userId: string): Promise<Types.Users> {
  return databases.getDocument(DB_CORE, COLLECTIONS.USERS, userId) as Promise<Types.Users>;
}

export async function updateUser(userId: string, data: Partial<Types.Users>) {
  return databases.updateDocument(DB_CORE, COLLECTIONS.USERS, userId, data);
}

export async function deleteUser(userId: string) {
  return databases.deleteDocument(DB_CORE, COLLECTIONS.USERS, userId);
}

// --- Example: Chat CRUD ---

export async function getChat(chatId: string): Promise<Types.Chats> {
  return databases.getDocument(DB_CORE, COLLECTIONS.CHATS, chatId) as Promise<Types.Chats>;
}

export async function listChats(queries: any[] = []) {
  return databases.listDocuments(DB_CORE, COLLECTIONS.CHATS, queries);
}

// --- Example: Message CRUD ---

export async function getMessage(messageId: string): Promise<Types.Messages> {
  return databases.getDocument(DB_CORE, COLLECTIONS.MESSAGES, messageId) as Promise<Types.Messages>;
}

export async function listMessages(chatId: string, queries: any[] = []) {
  return databases.listDocuments(DB_CORE, COLLECTIONS.MESSAGES, [
    Query.equal('chatId', chatId),
    ...queries,
  ]);
}

// --- Example: Auth helpers ---

export async function getCurrentAccount() {
  return account.get();
}

export async function logout() {
  return account.deleteSessions();
}

// --- Utility: Generic document fetch ---
export async function getDocument<T>(dbId: string, collectionId: string, docId: string): Promise<T> {
  return databases.getDocument(dbId, collectionId, docId) as Promise<T>;
}

export default client;
