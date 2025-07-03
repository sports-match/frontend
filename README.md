# Events Organize

A modern event management application built with Vue 3, TypeScript, and Vite.
UI components using Shadcn-vue

## Features

- Create, edit, and manage events
- Responsive UI with Vue 3 `<script setup>` SFCs
- Type-safe development with TypeScript
- Fast build and hot module replacement powered by Vite

## Getting Started

1. **Copy environment variables file:**
   ```bash
   cp .env.dev .env.local
   ```
2. **Install dependencies:**
   ```bash
   pnpm install
   ```
3. **Start the development server:**
   ```bash
   pnpm run dev
   ```
4. **Build for production:**
   ```bash
   pnpm run build
   ```

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Deploy

- Deploy to S3 bucket using GitHub Actions: push to master
- URL: http://www.sportrevive.com.s3-website-us-east-1.amazonaws.com/auth/login
