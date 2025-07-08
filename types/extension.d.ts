export interface Extension {
  extensionId: string;
  type: string;
  name: string;
  iconUrl?: string;
  settings?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}
