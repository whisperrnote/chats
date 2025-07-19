# whisperrchat

**Next-Gen Secure, Modular, Open-Source Chat Platform**

---

## 🚀 Overview

whisperrchat is a modern, privacy-first chat application built with Next.js, Appwrite, and RxDB.  
It features end-to-end encryption, mnemonic-based authentication, modular theming, and extensible architecture for bots, web3, and more.

---

## ✨ Features

- **Mnemonic-Based Authentication:**  
  - Users sign up and log in using a unique username and a 12/24-word recovery phrase.
  - The phrase serves as both password and encryption key for true E2E security.

- **End-to-End Encryption:**  
  - All messages and sensitive data are encrypted client-side.
  - Private keys are encrypted with the user's mnemonic-derived key.

- **User Profiles & Credibility:**  
  - Rich profiles with avatars, bios, status, and credibility tiers.
  - Username history and credibility scoring for trust and transparency.

- **Chats & Messaging:**  
  - Group, channel, private, bot, and extension chats.
  - Real-time messaging, reactions, replies, and media sharing.
  - Modular chat extensions and bots.

- **Patterned & Animated Backgrounds:**  
  - Customizable SVG motif backgrounds, theme-aware and animated.
  - User-selectable themes, animation levels, and live previews.

- **Offline Sync:**  
  - RxDB integration for seamless offline-first experience.
  - Automatic sync with Appwrite backend when online.

- **Modular Extensions:**  
  - Bots, web3 wallets, integrations, and more via the extensions database.

- **Accessibility & Responsiveness:**  
  - Full keyboard navigation, screen reader support, and high-contrast mode.
  - Mobile, tablet, and desktop layouts.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 15+, React 19, MUI, Framer Motion
- **Backend:** Appwrite Cloud (Databases, Auth, Storage, Functions)
- **Offline:** RxDB (client-side sync)
- **State:** Zustand
- **Crypto:** BIP39, PBKDF2, AES-GCM (client-side)
- **Testing:** Storybook, Vitest

---

## 📦 Project Structure

- `/app` — Next.js app routes
- `/components` — UI and app components
- `/store` — Zustand state stores
- `/lib` — Appwrite and crypto utilities
- `/types` — Appwrite TypeScript types
- `/public/images` — Logo and assets
- `/stories` — Storybook stories and docs

---

## 📝 Getting Started

1. **Clone the repo:**
   ```bash
   git clone https://github.com/whisperrnote/chats.git
   cd whisperrchat
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   - Copy `.env.sample` to `.env.local` and fill in your Appwrite project details.

4. **Run the app:**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

---

## 🔒 Security & Privacy

- **Zero Knowledge:** Recovery phrase is never stored or transmitted.
- **E2E Encryption:** All chat data is encrypted before leaving the device.
- **Appwrite Auth:** Secure, scalable authentication and session management.

---

## 🧩 Extensibility

- **Bots & Integrations:** Easily add bots, web3 wallets, and custom extensions.
- **Themes & Patterns:** Users can create, import, and share custom themes and backgrounds.
- **Animation Packs:** Modular animation system for UI delight.

---

## 📚 Documentation

- [Database Schema](./docxed/whisperrote/chats/database.md)
- [Authentication](./docxed/docs/appwrite/emailpassword.md)
- [UI/UX System](./docxed/whisperrote/chats/ui.md)
- [Animation System](./docxed/whisperrote/chats/animations.md)
- [Offline Sync](./docxed/docs/appwrite/offline-sync.md)

---

## 💡 Contributing

We welcome contributions!  
Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

---

---

## 🏷️ License

MIT © whisperrchat contributors

---
