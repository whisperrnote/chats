import Button from '../ui/Button';

export default function Topbar() {
  return (
    <header
      className="flex items-center transition-all duration-200"
      style={{
        height: 64,
        padding: '0 40px',
        background: 'rgba(255,255,255,0.92)',
        borderBottom: '1.5px solid #e8ded6',
        boxShadow: '0 6px 32px 0 rgba(124,77,30,0.09)',
        borderRadius: '0 0 18px 18px',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 30,
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div className="flex items-center gap-4">
        {/* Logo/Icon */}
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            fontWeight: 900,
            fontSize: 26,
            letterSpacing: 1.5,
            color: '#7c4d1e',
            textShadow: '0 2px 12px #e0c9b680',
            userSelect: 'none',
            cursor: 'pointer',
            transition: 'color 0.2s, text-shadow 0.2s',
          }}
          tabIndex={0}
          aria-label="WhisperrNote Home"
          onFocus={e => {
            (e.currentTarget as HTMLSpanElement).style.color = '#a86b32';
            (e.currentTarget as HTMLSpanElement).style.textShadow = '0 3px 16px #c69c6d77';
          }}
          onBlur={e => {
            (e.currentTarget as HTMLSpanElement).style.color = '#7c4d1e';
            (e.currentTarget as HTMLSpanElement).style.textShadow = '0 2px 12px #e0c9b680';
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            style={{ marginRight: 10, filter: 'drop-shadow(0 1px 4px #c69c6d44)' }}
            aria-hidden="true"
          >
            <circle cx="16" cy="16" r="14" fill="#7c4d1e" opacity="0.13" />
            <path
              d="M10 20L16 10L22 20"
              stroke="#7c4d1e"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          WhisperrNote
        </span>
      </div>
      {/* Nav links in the center */}
      <nav className="flex items-center gap-3" style={{ flex: 1, justifyContent: 'center' }}>
        {/* Nav links (extend as needed) */}
        <a
          href="#features"
          style={{
            color: '#7c4d1e',
            fontWeight: 500,
            fontSize: 15,
            padding: '6px 18px',
            borderRadius: 999,
            transition: 'background 0.2s, color 0.2s',
            textDecoration: 'none',
            marginRight: 6,
          }}
          onMouseOver={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = '#f7e7d6';
            (e.currentTarget as HTMLAnchorElement).style.color = '#a86b32';
          }}
          onMouseOut={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = '';
            (e.currentTarget as HTMLAnchorElement).style.color = '#7c4d1e';
          }}
        >
          Features
        </a>
        <a
          href="#about"
          style={{
            color: '#7c4d1e',
            fontWeight: 500,
            fontSize: 15,
            padding: '6px 18px',
            borderRadius: 999,
            transition: 'background 0.2s, color 0.2s',
            textDecoration: 'none',
            marginRight: 6,
          }}
          onMouseOver={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = '#f7e7d6';
            (e.currentTarget as HTMLAnchorElement).style.color = '#a86b32';
          }}
          onMouseOut={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = '';
            (e.currentTarget as HTMLAnchorElement).style.color = '#7c4d1e';
          }}
        >
          About
        </a>
      </nav>
      {/* Continue button at the far right */}
      <div className="flex items-center" style={{ marginLeft: 'auto' }}>
        <Button
          style={{
            fontSize: 16,
            padding: '10px 28px',
            borderRadius: 999,
            background: 'linear-gradient(90deg, #7c4d1e 60%, #c69c6d 100%)',
            color: '#fff',
            boxShadow: '0 3px 16px #7c4d1e22',
            border: 'none',
            fontWeight: 700,
            letterSpacing: 0.3,
            transition: 'background 0.2s, box-shadow 0.2s, transform 0.1s',
            cursor: 'pointer',
          }}
          onMouseOver={e => {
            (e.currentTarget as HTMLButtonElement).style.background =
              'linear-gradient(90deg, #a86b32 60%, #e2c199 100%)';
            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px) scale(1.04)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 22px #7c4d1e33';
          }}
          onMouseOut={e => {
            (e.currentTarget as HTMLButtonElement).style.background =
              'linear-gradient(90deg, #7c4d1e 60%, #c69c6d 100%)';
            (e.currentTarget as HTMLButtonElement).style.transform = '';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 3px 16px #7c4d1e22';
          }}
        >
          Continue
        </Button>
      </div>
    </header>
  );
}