export type MessageType = 'text' | 'image' | 'file' | 'audio' | 'video' | 'sticker' | 'system';

export interface Message {
  messageId: string;
  chatId: string;
  senderId: string;
  content: string;
  type: MessageType;
  createdAt: string;
  editedAt?: string;
  replyTo?: string;
  isDeleted: boolean;
  extensionPayload?: string;
}
