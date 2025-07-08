export function getDoodlePatternSVG({ color = 'var(--color-border)', opacity = 0.15, size = 48 } = {}) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 24 Q24 4 44 24 Q24 44 4 24 Z" stroke="${color}" stroke-opacity="${opacity}" stroke-width="2" fill="none"/>
    <circle cx="24" cy="24" r="6" stroke="${color}" stroke-opacity="${opacity}" stroke-width="2" fill="none"/>
  </svg>`;
}
