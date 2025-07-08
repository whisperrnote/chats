import { useState } from 'react';

export function useExtensions() {
  const [extensions, setExtensions] = useState([]);

  return {
    extensions,
    installExtension: (ext: any) => {/* TODO: implement install extension */},
    removeExtension: (extId: string) => {/* TODO: implement remove extension */},
    loading: false,
    error: null,
  };
}
