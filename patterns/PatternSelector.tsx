import { getGeometricPatternSVG } from './geometric';
import { getEmojiPatternSVG } from './emoji';
import { getDoodlePatternSVG } from './doodle';

const patterns = [
  { name: 'Geometric', getSVG: getGeometricPatternSVG },
  { name: 'Emoji', getSVG: getEmojiPatternSVG },
  { name: 'Doodle', getSVG: getDoodlePatternSVG },
];

export default function PatternSelector({ value, onChange }: { value: string; onChange: (name: string) => void }) {
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      {patterns.map((pattern) => (
        <button
          key={pattern.name}
          onClick={() => onChange(pattern.name)}
          style={{
            border: value === pattern.name ? '2px solid var(--color-accent)' : '1px solid var(--color-border)',
            borderRadius: 8,
            padding: 4,
            background: 'none',
            cursor: 'pointer'
          }}
          aria-label={pattern.name}
        >
          <span dangerouslySetInnerHTML={{ __html: pattern.getSVG({ size: 40 }) }} />
        </button>
      ))}
    </div>
  );
}
