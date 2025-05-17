# Overview

SPEAK is a new UI/UX proposal built with Next.js, React, TypeScript and TailwindCSS. I will update this readme later.

---

## Quick Start Guide for Complete Beginners

Welcome! If you want to work on this project locally, you can try the steps below.

### 1. Install Required Tools

#### a. Install [Node.js](https://nodejs.org/)

- Go to <https://nodejs.org/>
- Download the LTS version for your operating system (Windows, Mac, or Linux)
- Run the installer and follow the instructions

#### b. Install [Bun](https://bun.sh/)

- Open your Terminal (Mac/Linux) or Command Prompt (Windows)
- Copy and paste this command and press Enter:

  ```sh
  curl -fsSL https://bun.sh/install | bash
  ```

- Follow the instructions shown in your terminal

#### c. As code editor, I like to use [Cursor](https://www.cursor.so/)

- Go to <https://www.cursor.so/>
- Download and install Cursor for your operating system
- Open Cursor after installation

#### d. (Optional, but recommended) Install Extensions in Cursor

- Open Cursor
- Go to the Extensions tab (left sidebar)
- Search for and install any extensions. I like: Andromeda, Auto Rename Tag, Color Highlight, Color Pick, Git History, HTMLHINT, Iconify IntelliSense, markdownlint, Markdown Preview Enhancer, Path Intellisense, Prettier, vscode-icons
- I like using Synthwave '84 as theme

### 2. Get the Project Code

- Download the project as a ZIP from GitHub, or
- If you know how, use Git to clone the repository:

  ```sh
  git clone <your-repo-url>
  ```

- Open the project folder in Cursor (File > Open Folder)

### 3. Install Project Dependencies

- Open the built-in terminal in Cursor (View > Terminal)
- Run:

  ```sh
  bun install
  ```

  If you get an error, try:

  ```sh
  npm install
  ```

### 4. Start the Project

- In the terminal, run:

  ```sh
  bun dev
  ```

  Or, if that doesn't work:

  ```sh
  npm run dev
  ```

- Wait for the message that the server is running (usually on <http://localhost:3000>)
- Open your browser and go to <http://localhost:3000>

### 5. You're Ready

- You can now view and edit the project in Cursor

---

## Helpful Git Commands

Here are some useful Git commands for working with this project:

- **Check the status of your files:**

  ```sh
  git status
  ```

- **Add all changes to staging:**

  ```sh
  git add .
  ```

- **Commit your changes:**

  ```sh
  git commit -m "Your commit message here"
  ```

- **Push your changes to the remote repository:**

  ```sh
  git push
  ```

- **Pull the latest changes from the remote repository:**

  ```sh
  git pull
  ```

- **See your commit history:**

  ```sh
  git log --oneline
  ```

If you need help with any other Git commands, just ask in a prompt (for example: "How do I undo my last commit?" or "How do I create a new branch?").

---

## Working with Branches

It's a good idea to create your own branch when working on new features or fixes. This keeps your work separate and makes it easier to review and merge changes.

- **Create and switch to a new branch:**

  ```sh
  git checkout -b your-branch-name
  ```

- **Push your branch to GitHub:**

  ```sh
  git push -u origin your-branch-name
  ```

- **Open a Pull Request (PR):**
  1. Go to the repository on GitHub.
  2. Click "Compare & pull request" for your branch.
  3. Fill in details and create the PR to merge into `main` (or later, `development`).

- **Merging another branch into yours:**

  ```sh
  git pull origin branch-you-want-to-merge
  ```

**Branch strategy:**

- Right now, there is only a `main` branch (production).
- Soon, a `development` or `staging` branch will be added for testing before production.

---

## Using Browser Tools MCP

We use **Browser Tools MCP** for advanced debugging, testing, and auditing in this project. It helps with:

- Viewing console logs and errors
- Inspecting network requests and errors
- Running accessibility, performance, and SEO audits
- Debugging and optimizing the app

If you want to use Browser Tools MCP yourself:

1. Open the MCP panel in Cursor (usually available in the sidebar or via the command palette).
2. Use the available tools to check logs, run audits, or debug issues as needed.
3. You can ask me (the AI assistant) to fetch logs, run audits, or help interpret results at any time.

This makes it easier to spot and fix issues quickly, and to ensure the app meets quality standards.

---

## About Turbopack

This project uses **Turbopack** as the bundler for local development. Turbopack is the new, fast bundler from Vercel (the creators of Next.js). When you run `bun dev` or `npm run dev`, Turbopack is used automatically instead of Webpack.

- Turbopack is still experimental, so you may encounter bugs or differences from Webpack.
- For more info, see the [Turbopack documentation](https://turbo.build/pack/docs).

If you have issues or questions about the dev server, check if it's related to Turbopack first.

---

## Appendix: Cursor AI Assistant & Project Rules

In the past months I have refined my Cursor Rules. This is what I'm currently using:

## General Guidelines

1. Focus on easy and readable code over pure performance. Create smaller components (max ~500 lines), organized in folders with single responsibility.
2. Add clear, concise comments for complex logic or design decisions.
3. Use environment variables for configuration (Next.js conventions).
4. Implement performance optimizations: code splitting, lazy loading, parallel data fetching where appropriate.
5. Ensure accessibility (WCAG guidelines) for all components and pages.
6. Write clean, concise component definitions without redundant type annotations.
7. Avoid infinite loops.
8. Prefer iteration and modularization over code duplication.
9. Use lowercase with dashes for directory names (e.g., `components/auth-wizard`).
10. Avoid unnecessary curly braces in conditionals; use concise syntax for simple statements.
11. Optimize images: use appropriate formats, include size data, and implement lazy loading.
12. Use 'Sonner' for toast messages.
13. Tailwind: always cover both light and dark mode.

## UI/UX

- For all buttons and input fields, use `bg-muted` and `border border-default` unless specified otherwise.

## State Management & Data Fetching

1. Use Axios for HTTP requests and TanStack Query for state, caching, and synchronization.
2. Use Zustand for global state management.
3. Minimize `useEffect` and `setState`; favor derived state and memoization.

## Capabilities

- Analyze design screenshots for layout, styling, and component structure.
- Generate TypeScript code for Next.js 15 components, with proper imports/exports.
- When working with APIs, use Browser Tools MCP to check network logs and errors as needed.
- Use Browser Tools MCP for console logs and errors if needed.

## Folder Structure

- When working on a new section (e.g., a page called `stemtesten` that needs a menu):
  - Create a `components` folder inside `stemtesten`, then a `menu` folder for all menu components.
  - If the menu needs fetching, put those components in a `hooks` folder.
  - If it needs a store, use a `store` folder.
  - Utility files (e.g., formatting) go in a `utils` file.
  - If needed, place a `types.ts` file at the same level as `page.tsx`.
  - For other sections (e.g., a user table), create a new folder inside `components` (e.g., `user-table`) and organize related components there.

## Browser Tools MCP (Cursor Rules)

- Browser Tools MCP is available in Cursor for advanced debugging, testing, and auditing.
- Use it to view console logs, inspect network requests, run accessibility/performance/SEO audits, and debug/optimize the app.
- Open the MCP panel in Cursor (sidebar or command palette) to access these tools.
- You can ask the AI assistant to fetch logs, run audits, or help interpret results at any time.

---
