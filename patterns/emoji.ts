export function getEmojiPatternSVG({ emoji = '★', color = 'var(--color-border)', opacity = 0.15, size = 48 } = {}) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="${size / 2}" fill="${color}" fill-opacity="${opacity}">${emoji}</text>
  </svg>`;
}
