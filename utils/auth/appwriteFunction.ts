import { Client, Users, Databases, ID, Query } from 'node-appwrite';

interface Context {
  req: {
    payload: string;
    variables: Record<string, string>;
  };
  res: {
    json: (data: any, status?: number) => void;
  };
  log: (message: string) => void;
  error: (message: string) => void;
}

interface AuthPayload {
  action: 'register' | 'login';
  username: string;
  publicKey?: string;
  encryptedPrivateKey?: string;
}

interface AuthResponse {
  success?: boolean;
  ok?: boolean;
  message?: string;
  userId?: string;
  secret?: string;
  error?: string;
}

// Database configuration from environment
const DATABASE_ID = 'core';
const USERS_COLLECTION_ID = 'users';

/**
 * Appwrite Function for custom token authentication
 * This function should be deployed to Appwrite Cloud/Self-hosted
 * 
 * Environment variables required:
 * - APPWRITE_FUNCTION_ENDPOINT
 * - APPWRITE_FUNCTION_PROJECT_ID  
 * - APPWRITE_API_KEY
 */
export default async function({ req, res, log, error }: Context): Promise<void> {
  try {
    // Parse the request payload
    let payload: AuthPayload;
    try {
      payload = JSON.parse(req.payload);
    } catch (e) {
      error('Invalid JSON payload');
      return res.json({ success: false, error: 'Invalid JSON payload' }, 400);
    }

    const { action, username, publicKey, encryptedPrivateKey } = payload;

    // Validate required parameters
    if (!action || !username) {
      error('Missing required parameters: action and username');
      return res.json({ success: false, error: 'Missing required parameters' }, 400);
    }

    // Validate environment variables
    const endpoint = req.variables['APPWRITE_FUNCTION_ENDPOINT'];
    const projectId = req.variables['APPWRITE_FUNCTION_PROJECT_ID'];
    const apiKey = req.variables['APPWRITE_API_KEY'];

    if (!endpoint || !projectId || !apiKey) {
      error('Environment variables are not set');
      return res.json({ success: false, error: 'Function not configured' }, 500);
    }

    // Initialize Appwrite client
    const client = new Client()
      .setEndpoint(endpoint)
      .setProject(projectId)
      .setKey(apiKey);

    const users = new Users(client);
    const databases = new Databases(client);

    if (action === 'register') {
      log(`Registering user: ${username}`);

      // Validate required keys for registration
      if (!publicKey || !encryptedPrivateKey) {
        error('Missing publicKey or encryptedPrivateKey for registration');
        return res.json({ 
          success: false, 
          error: 'Missing keys for registration' 
        }, 400);
      }

      // Check if username already exists
      const existingUsers = await databases.listDocuments(
        DATABASE_ID,
        USERS_COLLECTION_ID,
        [Query.equal('username', username)]
      );

      if (existingUsers.total > 0) {
        error(`Username ${username} already exists`);
        return res.json({ 
          success: false, 
          error: 'Username already taken' 
        }, 409);
      }

      // Create Appwrite auth user with username as name
      const authUser = await users.create(
        ID.unique(),
        undefined, // email
        undefined, // phone
        undefined, // password
        username   // name
      );
      
      log(`Created auth user ${authUser.$id} for ${username}`);

      // Create user profile document
      await databases.createDocument(
        DATABASE_ID,
        USERS_COLLECTION_ID,
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
      
      log(`Created profile for ${username}`);

      // Create custom token
      const token = await users.createToken(authUser.$id);
      log(`Created token for ${username}`);

      const response: AuthResponse = {
        success: true,
        userId: authUser.$id,
        secret: token.secret,
        message: 'User registered successfully'
      };

      return res.json(response);

    } else if (action === 'login') {
      log(`Logging in user: ${username}`);

      // Find user by username
      const existingUsers = await databases.listDocuments(
        DATABASE_ID,
        USERS_COLLECTION_ID,
        [Query.equal('username', username)]
      );

      if (existingUsers.total === 0) {
        error(`Login failed: user ${username} not found`);
        return res.json({ 
          success: false, 
          error: 'User not found' 
        }, 404);
      }

      const userProfile = existingUsers.documents[0];
      const userId = userProfile.userId as string;

      // Create custom token for existing user
      const token = await users.createToken(userId);
      log(`Created token for ${username}`);

      const response: AuthResponse = {
        success: true,
        userId: userId,
        secret: token.secret,
        message: 'Login successful'
      };

      return res.json(response);

    } else {
      error(`Invalid action: ${action}`);
      return res.json({ 
        success: false, 
        error: 'Invalid action specified' 
      }, 400);
    }

  } catch (e: any) {
    error(`An error occurred: ${e.message}`);
    return res.json({ 
      success: false, 
      error: e.message || 'Internal server error' 
    }, 500);
  }
}