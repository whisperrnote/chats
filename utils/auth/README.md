# Custom Authentication System

This directory contains the custom authentication implementation for the chat application using Appwrite's custom token authentication.

## Overview

The custom auth system is organized into utils instead of functions to avoid conflicts with Appwrite's core function system. This allows for better code organization and enables future expansion for passkey and biometric authentication.

## Structure

```
utils/auth/
├── index.ts           # Client-side auth utilities
├── appwriteFunction.ts # Server-side Appwrite Function code
├── customToken.ts     # Server-side auth manager (for external servers)
└── README.md         # This file
```

## Client-Side Usage

```typescript
import { createCustomAuthClient } from '@/utils/auth';

const authClient = createCustomAuthClient();

// Register a new user
const result = await authClient.register(username, publicKey, encryptedPrivateKey);

// Login existing user
const result = await authClient.login(username);

// Use the token to create a session
if (result.success && result.secret) {
  const session = await account.createSession(result.userId!, result.secret);
}
```

## Appwrite Function Deployment

The `appwriteFunction.ts` file contains the server-side logic that should be deployed as an Appwrite Function:

1. Create a new function in your Appwrite console
2. Set function ID to `custom-auth`
3. Copy the code from `appwriteFunction.ts`
4. Set environment variables:
   - `APPWRITE_API_KEY`: Your Appwrite API key with Users.write permission

## Environment Variables

Required environment variables in your `.env.local`:

```bash
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
APPWRITE_API_KEY=your_api_key_here
NEXT_PUBLIC_APPWRITE_DB_CORE_ID=core
NEXT_PUBLIC_APPWRITE_COLLECTION_USERS=users
```

## How It Works

1. **Registration Flow**:
   - Client calls `authClient.register()` with username and encryption keys
   - Function validates username uniqueness
   - Creates Appwrite auth user and profile document
   - Returns custom token for session creation

2. **Login Flow**:
   - Client calls `authClient.login()` with username
   - Function looks up user profile by username
   - Creates custom token for existing user
   - Returns token for session creation

## Future Enhancements

The system is designed to support additional authentication methods:

- **Passkey Authentication**: WebAuthn-based passwordless login
- **Biometric Authentication**: Device-based biometric verification
- **Multi-Factor Authentication**: Additional security layers

## Security Considerations

- All encryption keys are generated client-side
- Private keys are encrypted before storage
- Username-based lookup allows for private authentication
- Custom tokens have configurable expiration times
- API key should have minimal required permissions

## Integration with Existing Code

The `lib/appwrite.ts` file has been updated to use the new custom auth system through the `executeAuthFunction()` method, maintaining backward compatibility with existing authentication flows.