import { Client, Users, Databases, ID, Query } from 'node-appwrite';

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

export interface ServerAuthConfig {
  endpoint: string;
  projectId: string;
  apiKey: string;
  databaseId: string;
  usersCollectionId: string;
}

/**
 * Custom authentication utility for creating and managing custom tokens
 * This is meant to be used server-side or in Appwrite Functions
 */
export class CustomAuthManager {
  private client: Client;
  private users: Users;
  private databases: Databases;
  private config: ServerAuthConfig;

  constructor(config: ServerAuthConfig) {
    this.config = config;
    
    // Initialize Appwrite client with API key for server operations
    this.client = new Client()
      .setEndpoint(config.endpoint)
      .setProject(config.projectId)
      .setKey(config.apiKey);

    this.users = new Users(this.client);
    this.databases = new Databases(this.client);
  }

  /**
   * Register a new user with custom authentication
   */
  async register(payload: CustomAuthPayload): Promise<CustomAuthResponse> {
    try {
      const { username, publicKey, encryptedPrivateKey } = payload;

      // Validate required fields for registration
      if (!publicKey || !encryptedPrivateKey) {
        return {
          success: false,
          error: 'Missing publicKey or encryptedPrivateKey for registration'
        };
      }

      // Check if username already exists
      const existingUsers = await this.databases.listDocuments(
        this.config.databaseId,
        this.config.usersCollectionId,
        [Query.equal('username', username)]
      );

      if (existingUsers.total > 0) {
        return {
          success: false,
          error: 'Username already taken'
        };
      }

      // Create Appwrite auth user
      const authUser = await this.users.create(
        ID.unique(),
        undefined, // email
        undefined, // phone
        undefined, // password
        username   // name
      );

      // Create user profile document
      await this.databases.createDocument(
        this.config.databaseId,
        this.config.usersCollectionId,
        ID.unique(),
        {
          userId: authUser.$id,
          username: username,
          publicKey: publicKey,
          encryptedPrivateKey: encryptedPrivateKey,
          status: 'OFFLINE',
          createdAt: new Date().toISOString(),
        }
      );

      // Create custom token
      const token = await this.users.createToken(authUser.$id);

      return {
        success: true,
        userId: authUser.$id,
        secret: token.secret,
        message: 'User registered successfully'
      };

    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Registration failed'
      };
    }
  }

  /**
   * Login existing user with custom authentication
   */
  async login(payload: CustomAuthPayload): Promise<CustomAuthResponse> {
    try {
      const { username } = payload;

      // Find user by username
      const existingUsers = await this.databases.listDocuments(
        this.config.databaseId,
        this.config.usersCollectionId,
        [Query.equal('username', username)]
      );

      if (existingUsers.total === 0) {
        return {
          success: false,
          error: 'User not found'
        };
      }

      const userProfile = existingUsers.documents[0];
      const userId = userProfile.userId as string;

      // Create custom token for existing user
      const token = await this.users.createToken(userId);

      return {
        success: true,
        userId: userId,
        secret: token.secret,
        message: 'Login successful'
      };

    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Login failed'
      };
    }
  }

  /**
   * Process authentication request
   */
  async processAuth(payload: CustomAuthPayload): Promise<CustomAuthResponse> {
    if (!payload.action || !payload.username) {
      return {
        success: false,
        error: 'Missing required parameters: action and username'
      };
    }

    switch (payload.action) {
      case 'register':
        return this.register(payload);
      case 'login':
        return this.login(payload);
      default:
        return {
          success: false,
          error: 'Invalid action specified'
        };
    }
  }
}

/**
 * Client-side utility for custom authentication
 */
export class CustomAuthClient {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  /**
   * Send authentication request to custom auth endpoint
   */
  async authenticate(payload: CustomAuthPayload): Promise<CustomAuthResponse> {
    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Network error'
      };
    }
  }
}

/**
 * Default configuration helper
 */
export function createServerAuthConfig(): ServerAuthConfig {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
  const apiKey = process.env.APPWRITE_API_KEY;
  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DB_CORE_ID;
  const usersCollectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_USERS;

  if (!endpoint || !projectId || !apiKey || !databaseId || !usersCollectionId) {
    throw new Error('Missing required environment variables for custom auth');
  }

  return {
    endpoint,
    projectId,
    apiKey,
    databaseId,
    usersCollectionId,
  };
}