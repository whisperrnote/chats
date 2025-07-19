# Authentication Flow Analysis: Why Appwrite Account/Username Is Not Being Created

## 1. **Appwrite Account Creation Logic**

- In `/lib/appwrite.ts`, the main signup method is `signupEmailPassword(email, password, name, userId)`.
- This method should:
  1. Create an Appwrite account (`account.create`)
  2. Create a session (`account.createEmailPasswordSession`)
  3. Return the created account, session, and userId.

- After signup, you also call `createUserProfile` to create a user document in the database.

## 2. **Possible Issues**

### a. **Signup Not Triggered**
- The signup logic is only triggered in `AuthPhraseInputOrGen.tsx` when the user does not exist and clicks "Sign Up".
- If the UI does not reach this code (e.g., due to state issues, missing phrase, or button not enabled), no signup occurs.

### b. **Incorrect Parameters**
- The signup uses:
  - Email: derived from username (`usernameToEmail`)
  - Password: the phrase
  - Name: username
- If any of these are empty or invalid, Appwrite will reject the request.

### c. **Appwrite SDK Not Connected**
- If `NEXT_PUBLIC_APPWRITE_ENDPOINT` or `NEXT_PUBLIC_APPWRITE_PROJECT_ID` is wrong or missing, the SDK will silently fail.
- Check your `.env` and ensure these match your Appwrite project.

### d. **Error Handling**
- If `signupEmailPassword` throws an error, it is caught and shown as an error message, but the user may not see it or it may not be logged.
- Check browser console and network requests for errors.

### e. **Database Structure**
- After signup, `createUserProfile` should create a document in the `users` collection.
- If the collection/database IDs do not match those in `appwrite.json`, or if permissions are wrong, the document creation will fail.

### f. **Session Not Persisted**
- After signup/login, the session must be persisted (Appwrite SDK does this automatically if used in browser).
- If you are using SSR or custom fetch, session may not persist.

### g. **Civic Auth Integration**
- Civic Auth only sets the username and moves to the next step; it does not create an Appwrite account.
- You must ensure that after Civic sign-in, the phrase step is completed and triggers the signup logic.

## 3. **Debug Checklist**

- [ ] Is `signupEmailPassword` being called with valid parameters?
- [ ] Are there any errors in the browser console or network tab?
- [ ] Is `NEXT_PUBLIC_APPWRITE_ENDPOINT` and `NEXT_PUBLIC_APPWRITE_PROJECT_ID` correct?
- [ ] Are the database/collection IDs in `/lib/appwrite.ts` matching those in `appwrite.json`?
- [ ] Is `createUserProfile` called after signup, and does it succeed?
- [ ] Are permissions for the `users` collection set to allow creation?
- [ ] Is the phrase (password) valid and non-empty?
- [ ] Is the UI state moving to the phrase step after Civic sign-in?

## 4. **How to Debug**

- Add `console.log` statements in `AuthPhraseInputOrGen.tsx` before calling `signupEmailPassword` and `createUserProfile`.
- Check network requests for errors.
- Check Appwrite dashboard for new users and documents.
- Make sure you are not using SSR for Appwrite SDK calls (must be client-side).

## 5. **Summary**

- The flow is correct in theory, but likely failing due to missing/invalid parameters, SDK misconfiguration, or database/collection mismatch.
- Civic Auth only sets the username; you must still complete the phrase step and trigger signup.
- Check all environment variables, database IDs, and error messages for clues.
