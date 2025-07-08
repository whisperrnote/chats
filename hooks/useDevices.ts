import { useState } from 'react';

export function useDevices() {
  const [devices, setDevices] = useState([]);

  return {
    devices,
    addDevice: (device: any) => {/* TODO: implement add device */},
    removeDevice: (deviceId: string) => {/* TODO: implement remove device */},
    loading: false,
    error: null,
  };
}
