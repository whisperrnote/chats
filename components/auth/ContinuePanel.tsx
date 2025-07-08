import Button from '../ui/Button';

export default function ContinuePanel() {
  return (
    <div style={{ padding: 24, minWidth: 320 }}>
      <h2>Continue</h2>
      <form
        style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
        // onSubmit={...} // Add logic later
        autoComplete="on"
      >
        <label>
          <span style={{ display: 'block', marginBottom: 4 }}>Username or Email</span>
          <input
            type="text"
            name="identifier"
            autoComplete="username"
            required
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: 6,
              border: '1px solid #ccc',
              fontSize: 16,
            }}
          />
        </label>
        <label>
          <span style={{ display: 'block', marginBottom: 4 }}>Password</span>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            required
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: 6,
              border: '1px solid #ccc',
              fontSize: 16,
            }}
          />
        </label>
        <Button type="submit" style={{ marginTop: 8 }}>
          Continue
        </Button>
        {/* Future: Forgot password, SSO, etc. */}
      </form>
    </div>
  );
}
