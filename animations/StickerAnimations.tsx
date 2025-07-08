export default function StickerAnimations({ sticker, animate = true }: { sticker: string; animate?: boolean }) {
  // Placeholder: animate sticker on mount
  return (
    <span
      style={{
        display: 'inline-block',
        fontSize: 40,
        transition: animate ? 'transform 0.4s cubic-bezier(.4,0,.2,1)' : undefined,
        transform: animate ? 'scale(1.2)' : 'scale(1)'
      }}
    >
      {sticker}
    </span>
  );
}
