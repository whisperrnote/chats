const sdk = require('node-appwrite');

// Hardcoded values from appwrite.json
const DATABASE_ID = 'core';
const USERS_COLLECTION_ID = 'users';

module.exports = async ({ req, res, log, error }) => {
  const { action, username, publicKey, encryptedPrivateKey } = JSON.parse(req.payload);

  if (!action || !username) {
    error('Missing required parameters: action and username');
    return res.json({ ok: false, message: 'Missing required parameters.' }, 400);
  }

  const client = new sdk.Client();
  const users = new sdk.Users(client);
  const database = new sdk.Databases(client);

  if (
    !req.variables['APPWRITE_FUNCTION_ENDPOINT'] ||
    !req.variables['APPWRITE_FUNCTION_PROJECT_ID'] ||
    !req.variables['APPWRITE_FUNCTION_API_KEY']
  ) {
    error('Environment variables are not set. Function cannot use Appwrite SDK.');
    return res.json({ ok: false, message: 'Function not configured.' }, 500);
  }

  client
    .setEndpoint(req.variables['APPWRITE_FUNCTION_ENDPOINT'])
    .setProject(req.variables['APPWRITE_FUNCTION_PROJECT_ID'])
    .setKey(req.variables['APPWRITE_FUNCTION_API_KEY']);

  try {
    if (action === 'register') {
      log(`Registering user: ${username}`);

      if (!publicKey || !encryptedPrivateKey) {
        error('Missing publicKey or encryptedPrivateKey for registration.');
        return res.json({ ok: false, message: 'Missing keys for registration.' }, 400);
      }

      // 1. Check if user already exists in our custom users collection
      const existingUsers = await database.listDocuments(
        DATABASE_ID,
        USERS_COLLECTION_ID,
        [sdk.Query.equal('username', [username])]
      );

      if (existingUsers.total > 0) {
        error(`Username ${username} already exists.`);
        return res.json({ ok: false, message: 'Username already taken.' }, 409);
      }

      // 2. Create Appwrite auth user
      // We don't use email/password, so those are undefined.
      // We use the username as the name field in the auth user.
      const authUser = await users.create(sdk.ID.unique(), undefined, undefined, undefined, username);
      log(`Created auth user ${authUser.$id} for ${username}`);

      // 3. Create user profile document in the database
      await database.createDocument(
        DATABASE_ID,
        USERS_COLLECTION_ID,
        sdk.ID.unique(),
        {
          userId: authUser.$id,
          username: username,
          publicKey: publicKey,
          encryptedPrivateKey: encryptedPrivateKey,
          createdAt: new Date().toISOString(),
        }
      );
      log(`Created profile for ${username}`);

      // 4. Create a custom token for the new user
      const token = await users.createToken(authUser.$id);
      log(`Created token for ${username}`);

      return res.json({ userId: authUser.$id, secret: token.secret });

    } else if (action === 'login') {
      log(`Logging in user: ${username}`);

      // 1. Find user in our custom users collection
      const existingUsers = await database.listDocuments(
        DATABASE_ID,
        USERS_COLLECTION_ID,
        [sdk.Query.equal('username', [username])]
      );

      if (existingUsers.total === 0) {
        error(`Login failed: user ${username} not found.`);
        return res.json({ ok: false, message: 'User not found.' }, 404);
      }

      const userProfile = existingUsers.documents[0];
      const userId = userProfile.userId;

      // 2. Create a custom token for the user
      const token = await users.createToken(userId);
      log(`Created token for ${username}`);

      return res.json({ userId: userId, secret: token.secret });

    } else {
      error(`Invalid action: ${action}`);
      return res.json({ ok: false, message: 'Invalid action specified.' }, 400);
    }
  } catch (e) {
    error(`An error occurred: ${e.message}`);
    return res.json({ ok: false, message: e.message }, 500);
  }
};
