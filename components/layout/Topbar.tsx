import Button from '../ui/Button';

export default function Topbar() {
  return (
    <header
      className="flex items-center justify-between"
      style={{
        height: 60,
        padding: '0 36px',
        background: 'rgba(255,255,255,0.85)',
        borderBottom: '1.5px solid #e0e0e0',
        boxShadow: '0 4px 24px 0 rgba(60, 40, 20, 0.07)',
        borderRadius: '0 0 18px 18px',
        backdropFilter: 'blur(8px)',
        position: 'sticky',
        top: 0,
        zIndex: 20,
      }}
    >
      <div className="flex items-center gap-3">
        {/* Logo/Icon */}
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            fontWeight: 800,
            fontSize: 24,
            letterSpacing: 1,
            color: '#7c4d1e',
            textShadow: '0 2px 8px #e0c9b6a0',
            userSelect: 'none',
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            style={{ marginRight: 8 }}
          >
            <circle cx="16" cy="16" r="14" fill="#7c4d1e" opacity="0.12" />
            <path
              d="M10 20L16 10L22 20"
              stroke="#7c4d1e"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          WhisperrNote
        </span>
      </div>
      <nav className="flex items-center gap-4">
        {/* Example nav link, can be replaced/extended */}
        <Button
          style={{
            fontSize: 16,
            padding: '8px 26px',
            borderRadius: 999,
            background: 'linear-gradient(90deg, #7c4d1e 60%, #c69c6d 100%)',
            color: '#fff',
            boxShadow: '0 2px 12px #7c4d1e22',
            border: 'none',
            fontWeight: 600,
            transition: 'background 0.2s, box-shadow 0.2s, transform 0.1s',
            cursor: 'pointer',
          }}
          onMouseOver={e => {
            (e.currentTarget as HTMLButtonElement).style.background =
              'linear-gradient(90deg, #a86b32 60%, #e2c199 100%)';
            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px) scale(1.03)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 18px #7c4d1e33';
          }}
          onMouseOut={e => {
            (e.currentTarget as HTMLButtonElement).style.background =
              'linear-gradient(90deg, #7c4d1e 60%, #c69c6d 100%)';
            (e.currentTarget as HTMLButtonElement).style.transform = '';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 12px #7c4d1e22';
          }}
        >
          Continue
        </Button>
      </nav>
    </header>
  );
}
