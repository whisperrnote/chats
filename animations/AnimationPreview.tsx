import { useState } from 'react';
import CircularWipe from './CircularWipe';
import StickerAnimations from './StickerAnimations';

export default function AnimationPreview() {
  const [showWipe, setShowWipe] = useState(false);

  return (
    <div style={{ padding: 24 }}>
      <h3>Animation Preview</h3>
      <button onClick={() => setShowWipe(true)}>Preview Circular Wipe</button>
      <div style={{ margin: '16px 0' }}>
        <StickerAnimations sticker="🎉" />
      </div>
      <CircularWipe show={showWipe} onComplete={() => setShowWipe(false)} />
    </div>
  );
}
