export function getGeometricPatternSVG({ color = 'var(--color-border)', opacity = 0.15, size = 48 } = {}) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="${size - 2}" height="${size - 2}" rx="12" stroke="${color}" stroke-opacity="${opacity}" stroke-width="2"/>
    <circle cx="${size / 2}" cy="${size / 2}" r="${size / 4}" stroke="${color}" stroke-opacity="${opacity}" stroke-width="2"/>
  </svg>`;
}
