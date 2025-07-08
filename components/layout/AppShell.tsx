import Sidebar from './Sidebar';
import Topbar from './Topbar';
import ChatWindow from '../chat/ChatWindow';

export default function AppShell() {
  return (
    <div className="flex" style={{ height: '100vh' }}>
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <ChatWindow />
      </div>
      {/* Future: SecondaryPanel, ProfilePanel, etc. */}
    </div>
  );
}
