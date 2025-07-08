export default function ChatWindow() {
  return (
    <section className="flex-1" style={{ background: 'var(--color-bg)', display: 'flex', flexDirection: 'column' }}>
      {/* TODO: ChatHeader, MessageList, MessageInput */}
      <div style={{ flex: 1, padding: 24 }}>ChatWindow</div>
      <div style={{ borderTop: '1px solid var(--color-border)', padding: 16 }}>MessageInput</div>
    </section>
  );
}
