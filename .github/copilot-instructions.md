# Copilot Instructions for WhisperrNote Chats

## Architecture Overview

- **Monorepo Structure:**  
  - Main chat app is in `/home/nathfavour/Documents/code/whisperrnote/chats/`.
  - Related documentation and design notes are in `/home/nathfavour/Documents/code/nathfavour/docxed/`.
- **Appwrite Integration:**  
  - All user, chat, message, and extension data is stored in Appwrite databases.
  - `/lib/appwrite.ts` centralizes all Appwrite SDK usage, including account/session management and CRUD for all collections.
  - Database/collection IDs are loaded from environment variables and must match those in `appwrite.json`.
- **Authentication:**  
  - Supports both username+phrase (mnemonic) and Civic Auth (web3/OAuth).
  - Civic Auth is enabled via `NEXT_PUBLIC_INTEGRATION_CIVIC=true` in `.env`.
  - Auth flow state is managed via Zustand in `/store/authFlow.ts`.
  - The `/auth` page offers both username and Civic sign-in, with phrase-based password for Appwrite account creation.
  - Civic Auth is integrated as a supplementary method for obtaining the username.
- **UI/UX:**  
  - Uses MUI for core UI components, with custom theming in `/theme/theme.ts`.
  - Animated transitions via Framer Motion.
  - Topbar and navigation components adapt based on authentication state and Civic integration.
  - Patterned backgrounds and theme switching are available globally.
- **Middleware:**  
  - All Next.js middleware must be composed in `/middleware.ts` at the project root.
  - Individual middlewares (auth, rateLimit) are imported and executed in sequence.
  - Exported `config` must be a plain object literal with a merged matcher array.
- **External Integrations:**  
  - Civic Auth: `/app/layout.tsx` wraps the app in `CivicAuthProvider` if enabled.
  - Appwrite: All endpoints, project IDs, and collection names are loaded from `.env`.
  - XMTP (chat): Example integration in `chat/src/app/app/dashboardClient.tsx`.

## Developer Workflow

- **Environment Setup:**  
  - Copy `env.sample` to `.env` and fill in all required values, especially Appwrite and Civic client IDs.
  - Restart the dev server after any `.env` changes.
- **Build/Run:**  
  - Use standard Next.js commands: `npm run dev`, `npm run build`.
- **Debugging:**  
  - Use browser console and network tab to trace authentication and Appwrite API errors.
  - Check Appwrite dashboard for user/session/document creation.
- **Patterns & Conventions:**  
  - All Appwrite interactions go through `/lib/appwrite.ts`.
  - Authentication state is managed via Zustand (`/store/authFlow.ts`).
  - UI components are colocated in `/components`, grouped by feature (auth, layout, chat).
  - Use `NEXT_PUBLIC_` prefix for all client-exposed environment variables.
  - Middleware must be composed in a single file and export a static matcher config.

## Examples

- **Appwrite Account Creation:**  
  - See `signupEmailPassword` and `createUserProfile` in `/lib/appwrite.ts`.
- **Civic Auth Integration:**  
  - See conditional logic in `/app/layout.tsx` and `/app/auth/page.tsx`.
- **Auth Flow State:**  
  - See `/store/authFlow.ts` for all state transitions and setters.
- **Middleware Composition:**  
  - See `/middleware.ts` for how multiple middlewares are chained.

## Key Files

- `/lib/appwrite.ts` - Appwrite SDK and data access
- `/store/authFlow.ts` - Auth flow state management
- `/app/layout.tsx` - Civic Auth provider integration
- `/app/auth/page.tsx` - Main authentication UI and logic
- `/middleware.ts` - Next.js middleware composition

---

**Feedback:**  
If any section is unclear or missing, please specify which workflows, patterns, or integration details need further explanation.


notes: when asked to fix a problem, whether being explicitly told or not, first describe how you would fix the problem, adding very relevant snippets if possible. then after approval, or further inputs, and then a go-ahead, proceed to fix/implement the changes/fixes. never directly edit on first request.