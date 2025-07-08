import DeviceItem from './DeviceItem';

export default function DeviceList() {
  // TODO: Replace with real device data
  return (
    <div style={{ width: 320, background: 'var(--color-surface)', borderRight: '1px solid var(--color-border)', height: '100vh', overflowY: 'auto' }}>
      <div style={{ padding: 16, fontWeight: 600 }}>Devices</div>
      <DeviceItem />
      <DeviceItem />
    </div>
  );
}
