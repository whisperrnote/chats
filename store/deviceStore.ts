import { create } from 'zustand';

interface DeviceState {
  devices: any[];
  setDevices: (devices: any[]) => void;
}

export const useDeviceStore = create<DeviceState>((set) => ({
  devices: [],
  setDevices: (devices) => set({ devices }),
}));
