export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString();
}

export function truncate(str: string, max: number): string {
  return str.length > max ? str.slice(0, max - 1) + '…' : str;
}

// Remove Appwrite system fields from a data object before sending to createDocument/updateDocument
export function stripAppwriteSystemFields<T extends Record<string, any>>(data: T): T {
  const forbidden = [
    '$id', '$createdAt', '$updatedAt', '$permissions', '$collectionId', '$databaseId', '$sequence'
  ];
  const clean: Record<string, any> = {};
  for (const key in data) {
    if (!forbidden.includes(key)) {
      clean[key] = data[key];
    }
  }
  return clean as T;
}
