import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex" style={{ height: '100vh' }}>
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="flex-1" style={{ overflow: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
