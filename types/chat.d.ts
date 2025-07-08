export type ChatType = 'private' | 'group' | 'channel' | 'bot' | 'extension';

export interface Chat {
  chatId: string;
  type: ChatType;
  title?: string;
  avatarUrl?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  isEncrypted: boolean;
  extensionType?: string;
}
