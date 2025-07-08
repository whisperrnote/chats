import ContactItem from './ContactItem';

export default function ContactList() {
  return (
    <div style={{ width: 280, background: 'var(--color-surface)', borderRight: '1px solid var(--color-border)', height: '100vh', overflowY: 'auto' }}>
      <div style={{ padding: 16, fontWeight: 600 }}>Contacts</div>
      {/* TODO: Map contacts */}
      <ContactItem />
      <ContactItem />
    </div>
  );
}
