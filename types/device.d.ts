export interface Device {
  deviceId: string;
  userId: string;
  deviceType: string;
  pushToken?: string;
  lastActive: string;
}
