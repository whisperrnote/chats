import { useState } from 'react';
import { useAuthFlow } from '@/store/authFlow';
import { signupEmailPassword, findUserByUsername, ID } from '@/lib/appwrite';
import { useSnackbar } from '@/components/providers/SnackbarProvider';

export default function RegisterPanel() {
  const { setUsername, setStep } = useAuthFlow();
  const snackbar = useSnackbar();
  const [username, setLocalUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!username || !password || !confirm) {
      setError('All fields are required.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      const exists = await findUserByUsername(username);
      if (exists) {
        setError('Username already exists.');
        return;
      }
      const userId = ID.unique();
      await signupEmailPassword(username + '@users.noreply.whisperrchat.space', password, username, userId);
      // Ensure session is active
      try {
        await import('@/lib/appwrite').then(m => m.getCurrentAccount());
      } catch {
        // Fallback: try to log in
        await import('@/lib/appwrite').then(m => m.loginEmailPassword(username + '@users.noreply.whisperrchat.space', password));
      }
      setUsername(username);
      setStep('done'); // Next: phrase generation for E2EE
      snackbar.show('Account created! Please set up your recovery phrase.', 'success');
    } catch (err: any) {
      setError(err?.message || 'Signup failed');
      snackbar.show(err?.message || 'Signup failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24, minWidth: 320 }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} autoComplete="on" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <label>
          <span style={{ display: 'block', marginBottom: 4 }}>Username</span>
          <input
            type="text"
            value={username}
            onChange={e => setLocalUsername(e.target.value)}
            autoComplete="username"
            required
            style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
          />
        </label>
        <label>
          <span style={{ display: 'block', marginBottom: 4 }}>Password</span>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="new-password"
            required
            style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
          />
        </label>
        <label>
          <span style={{ display: 'block', marginBottom: 4 }}>Confirm Password</span>
          <input
            type="password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            autoComplete="new-password"
            required
            style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
          />
        </label>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit" disabled={loading} style={{ marginTop: 8 }}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}
