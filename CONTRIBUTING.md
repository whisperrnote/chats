# Contributing to WhisperrNote Chats

Thank you for your interest in contributing! Please follow these guidelines to ensure a smooth workflow.

## Getting Started

- Clone the repository and install dependencies:  
  `npm install`
- Copy `env.sample` to `.env` and fill in all required values (Appwrite, Civic, etc).
- Use `npm run dev` to start the development server.

## Code Style & Structure

- Use TypeScript and React (Next.js) conventions.
- UI components are grouped by feature in `/components`.
- All Appwrite interactions go through `/lib/appwrite.ts`.
- Authentication state is managed via Zustand in `/store/authFlow.ts`.
- Use Framer Motion for animations and MUI for UI components.

## Making Changes

- Avoid duplicating code; use `...existing code...` in code suggestions.
- Middleware must be composed in `/middleware.ts` at the project root.
- Update or add tests if relevant.
- Document new features or changes in the appropriate markdown files.

## Pull Requests

- Fork the repo and create a feature branch.
- Make sure your changes pass linting and build.
- Clearly describe your changes and reference related issues.
- Keep PRs focused and concise.

## Reporting Issues

- Use GitHub Issues for bugs, feature requests, or questions.
- Include steps to reproduce, expected behavior, and relevant logs.

## Contact

For major changes or architectural questions, please open an issue for discussion before submitting a PR.

---
Happy coding!