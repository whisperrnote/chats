import { client } from '../lib/appwrite';

export async function getMessages(chatId: string) {
  // TODO: Fetch messages for chat from backend
  return [];
}

export async function sendMessage(chatId: string, content: string, type: string = 'text') {
  // TODO: Send message to backend
  return null;
}

export async function editMessage(messageId: string, updates: any) {
  // TODO: Edit message in backend
  return null;
}

export async function deleteMessage(messageId: string) {
  // TODO: Delete message in backend
  return null;
}