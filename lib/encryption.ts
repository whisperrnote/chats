// Use Web Crypto API for browser compatibility
const ALGO = 'AES-GCM';

export async function encryptMessage(plain: string, keyHex: string): Promise<string> {
  try {
    // Convert hex key to buffer
    const keyBuffer = new Uint8Array(keyHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
    
    // Import the key
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyBuffer,
      { name: ALGO },
      false,
      ['encrypt']
    );

    // Generate random IV
    const iv = crypto.getRandomValues(new Uint8Array(12));
    
    // Encrypt the data
    const encoded = new TextEncoder().encode(plain);
    const encrypted = await crypto.subtle.encrypt(
      { name: ALGO, iv },
      cryptoKey,
      encoded
    );

    // Convert to hex strings and combine
    const ivHex = Array.from(iv).map(b => b.toString(16).padStart(2, '0')).join('');
    const encryptedHex = Array.from(new Uint8Array(encrypted)).map(b => b.toString(16).padStart(2, '0')).join('');
    
    return `${ivHex}:${encryptedHex}`;
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt message');
  }
}

export async function decryptMessage(enc: string, keyHex: string): Promise<string> {
  try {
    const [ivHex, encryptedHex] = enc.split(':');
    
    // Convert hex strings back to buffers
    const keyBuffer = new Uint8Array(keyHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
    const iv = new Uint8Array(ivHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
    const encrypted = new Uint8Array(encryptedHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));

    // Import the key
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyBuffer,
      { name: ALGO },
      false,
      ['decrypt']
    );

    // Decrypt the data
    const decrypted = await crypto.subtle.decrypt(
      { name: ALGO, iv },
      cryptoKey,
      encrypted
    );

    // Convert back to string
    return new TextDecoder().decode(decrypted);
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt message');
  }
}