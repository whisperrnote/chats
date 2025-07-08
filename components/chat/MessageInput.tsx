export default function MessageInput() {
  return (
    <form style={{ display: 'flex', gap: 8, padding: 16, borderTop: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
      {/* TODO: Emoji/sticker picker, file upload, E2E status */}
      <input
        type="text"
        placeholder="Type a message…"
        style={{ flex: 1, padding: 8, borderRadius: 8, border: '1px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)' }}
        disabled
      />
      <button type="submit" disabled>Send</button>
    </form>
  );
}
