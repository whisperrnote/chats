import { Models } from 'appwrite';

export enum Status {
  ONLINE = "online",
  OFFLINE = "offline",
  AWAY = "away",
}

export enum Type {
  GROUP = "group",
  CHANNEL = "channel",
  BOT = "bot",
  EXTENSION = "extension",
  PRIVATE = "private",
}

export enum Role {
  ADMIN = "admin",
  MEMBER = "member",
  OWNER = "owner",
  BOT = "bot",
  EXTENSION = "extension",
}

export enum Type {
  TEXT = "text",
  IMAGE = "image",
  FILE = "file",
  AUDIO = "audio",
  VIDEO = "video",
  STICKER = "sticker",
  SYSTEM = "system",
}

export type Users = Models.Document & {
  userId: string;
  username: string;
  displayName: string | null;
  avatarUrl: string | null;
  bio: string | null;
  phone: string | null;
  email: string | null;
  publicKey: string;
  createdAt: string;
  lastSeen: string | null;
  status: Status | null;
}

export type Chats = Models.Document & {
  chatId: string;
  type: Type;
  title: string | null;
  avatarUrl: string | null;
  createdBy: Users | null;
  createdAt: string;
  updatedAt: string;
  isEncrypted: boolean | null;
  extensionType: string | null;
}

export type ChatMembers = Models.Document & {
  chatId: Chats | null;
  userId: Users | null;
  role: Role;
  joinedAt: string;
  mutedUntil: string | null;
}

export type Messages = Models.Document & {
  messageId: string;
  chatId: Chats | null;
  senderId: Users | null;
  content: string;
  type: Type | null;
  createdAt: string;
  editedAt: string | null;
  replyTo: Messages | null;
  isDeleted: boolean | null;
  extensionPayload: string | null;
}

export type Contacts = Models.Document & {
  ownerId: Users | null;
  createdAt: string;
  alias: string | null;
}

export type Devices = Models.Document & {
  deviceId: string;
  userId: Users | null;
  deviceType: string;
  pushToken: string | null;
  lastActive: string;
}

export type Bots = Models.Document & {
}

export type Web3wallets = Models.Document & {
}

export type Integrations = Models.Document & {
}

export type ExtensionSettings = Models.Document & {
}

