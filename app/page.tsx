export default function LandingPage() {
  return (
    <main className="flex flex-col center" style={{ minHeight: '100vh' }}>
      <h1>WhisperrNote</h1>
      <p>Secure, extensible chat platform</p>
      <div className="flex" style={{ gap: 24 }}>
        <button>Login</button>
        <button>Register</button>
      </div>
      {/* In the future, show LoginPanel/RegisterPanel overlays */}
    </main>
  );
}