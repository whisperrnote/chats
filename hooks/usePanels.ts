import { useState } from 'react';

export function usePanels() {
  const [activePanel, setActivePanel] = useState('chat');

  return {
    activePanel,
    openPanel: (panel: string) => setActivePanel(panel),
    closePanel: () => setActivePanel('chat'),
  };
}
