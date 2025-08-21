// Client-side custom auth utilities that work with Appwrite Functions
export interface CustomAuthPayload {
  action: 'register' | 'login';
  username: string;
  publicKey?: string;
  encryptedPrivateKey?: string;
}

export interface CustomAuthResponse {
  success: boolean;
  message?: string;
  userId?: string;
  secret?: string;
  error?: string;
}

/**
 * Client-side custom authentication handler
 * This sends requests to an Appwrite Function that handles the server-side logic
 */
export class CustomAuthClient {
  private functionEndpoint: string;

  constructor(functionEndpoint: string) {
    this.functionEndpoint = functionEndpoint;
  }

  /**
   * Send authentication request to Appwrite Function
   */
  async authenticate(payload: CustomAuthPayload): Promise<CustomAuthResponse> {
    try {
      const response = await fetch(this.functionEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      
      // Handle both old and new response formats
      if (result.userId && result.secret) {
        return {
          success: true,
          userId: result.userId,
          secret: result.secret,
          message: result.message || 'Authentication successful'
        };
      } else if (result.ok === false) {
        return {
          success: false,
          error: result.message || 'Authentication failed'
        };
      } else {
        return result;
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Network error'
      };
    }
  }

  /**
   * Register a new user
   */
  async register(username: string, publicKey: string, encryptedPrivateKey: string): Promise<CustomAuthResponse> {
    return this.authenticate({
      action: 'register',
      username,
      publicKey,
      encryptedPrivateKey
    });
  }

  /**
   * Login existing user
   */
  async login(username: string): Promise<CustomAuthResponse> {
    return this.authenticate({
      action: 'login',
      username
    });
  }
}

/**
 * Helper to create auth client with default function endpoint
 */
export function createCustomAuthClient(): CustomAuthClient {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
  
  if (!endpoint || !projectId) {
    throw new Error('Missing Appwrite configuration');
  }

  // Use the Appwrite Function endpoint
  const functionEndpoint = `${endpoint}/functions/custom-auth/executions`;
  
  return new CustomAuthClient(functionEndpoint);
}

/**
 * Passkey authentication interfaces for future implementation
 */
export interface PasskeyAuthPayload {
  action: 'register' | 'login';
  username: string;
  challenge?: string;
  credential?: PublicKeyCredential;
}

export interface BiometricAuthPayload {
  action: 'register' | 'login';
  username: string;
  biometricData?: string;
  deviceId?: string;
}

/**
 * Future: Passkey authentication client
 */
export class PasskeyAuthClient {
  private functionEndpoint: string;

  constructor(functionEndpoint: string) {
    this.functionEndpoint = functionEndpoint;
  }

  async register(username: string): Promise<CustomAuthResponse> {
    // TODO: Implement WebAuthn passkey registration
    throw new Error('Passkey auth not implemented yet');
  }

  async login(username: string): Promise<CustomAuthResponse> {
    // TODO: Implement WebAuthn passkey login
    throw new Error('Passkey auth not implemented yet');
  }
}

/**
 * Future: Biometric authentication client
 */
export class BiometricAuthClient {
  private functionEndpoint: string;

  constructor(functionEndpoint: string) {
    this.functionEndpoint = functionEndpoint;
  }

  async register(username: string, deviceId: string): Promise<CustomAuthResponse> {
    // TODO: Implement biometric registration
    throw new Error('Biometric auth not implemented yet');
  }

  async login(username: string, deviceId: string): Promise<CustomAuthResponse> {
    // TODO: Implement biometric login
    throw new Error('Biometric auth not implemented yet');
  }
}