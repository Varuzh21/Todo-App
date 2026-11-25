# Todo App

A to-do app for **iOS and Android**, built with Expo and React Native. Plan tasks by day, follow your progress on a dashboard, and browse tasks in a calendar. Tasks and profile edits are stored on the device, so they work offline.

## Features

- **Dashboard:** greeting, today's progress, task counts that link to the matching screen, and today's tasks.
- **Tasks:** Behind Schedule, Upcoming and Completed tabs. Create a task with a due date, and tap a task to complete it or undo it.
- **Calendar:** Day, Week and Month views, with search by title or date (`yyyy-MM-dd`).
- **Profile:** view and edit your name, email, phone, gender and date of birth.
- **Sign-in:** [DummyJSON](https://dummyjson.com/docs/auth) authentication with token refresh. Tokens are kept in the device's secure storage.

## Tech stack

| Area         | Library                                                         |
| ------------ | --------------------------------------------------------------- |
| App          | Expo SDK 58, React Native 0.88, React 19, TypeScript 6 (strict) |
| Navigation   | Expo Router (typed routes, protected routes)                    |
| Data         | TanStack Query v5, axios                                        |
| Storage      | AsyncStorage (tasks, profile), SecureStore (tokens, user id)    |
| Forms        | Formik, Zod v4                                                  |
| Dates        | date-fns                                                        |
| UI           | `@expo/ui` (native sheet, menu and date picker), FlashList v2   |
| Code quality | Biome (lint and format), TypeScript                             |

## Getting started

### Requirements

- [Bun](https://bun.sh)
- Node.js 22.13+, 24.3+ or 26+
- Xcode for iOS, Android Studio for Android

No environment variables are needed.

### Install and run

The app uses native modules, so it runs in a [development build](https://docs.expo.dev/develop/development-builds/introduction/), **not in Expo Go**.

```bash
git clone https://github.com/Varuzh21/Todo-App.git
cd Todo-App
bun install
```

Build and run the app:

```bash
bun run ios      # iOS simulator
bun run android  # Android emulator
```

After the first build, starting the dev server is enough:

```bash
bun run start
```

Build again after adding or updating a package with native code.

### Sign in

Use any [DummyJSON test user](https://dummyjson.com/users). Sign in with the **username**, not the email.

## Scripts

| Command             | Description                       |
| ------------------- | --------------------------------- |
| `bun run start`     | Start the dev server              |
| `bun run ios`       | Build and run on iOS              |
| `bun run android`   | Build and run on Android          |
| `bun run typecheck` | Check types                       |
| `bun run check`     | Check linting and formatting      |
| `bun run check:fix` | Fix linting and formatting issues |

Install packages with `bunx expo install <package>`, so their versions match the Expo SDK.

## Project structure

The code follows [Feature-Sliced Design](https://feature-sliced.design). Imports only go down the list:

```
src/
├── app/        Expo Router routes and layouts
├── screens/    welcome, sign-in, menu, task, calendar, profile
├── widgets/    tab bars, task list, calendar
├── features/   auth, create-task, toggle-task, edit-profile
├── entities/   session, task, user
└── shared/     api, config, lib, ui, assets
```

Each slice has a public API in its `index.ts`. The architecture and conventions are described in [AGENTS.md](AGENTS.md).

## How data works

- **DummyJSON** is used for sign-in and to load the profile the first time.
- **Tasks and profile edits** are saved on the device, separately for each user. They are not synced or backed up, and can be lost when the app is uninstalled.
- **Due dates** are stored as calendar days (`yyyy-MM-dd`), so time zones never shift them.

## Builds and deployment

Builds and updates run on [EAS](https://docs.expo.dev/eas/). The workflows are in `.eas/workflows`:

| Workflow                        | Runs on        | What it does                                                                                |
| ------------------------------- | -------------- | ------------------------------------------------------------------------------------------- |
| `create-development-builds.yml` | Manual         | Creates development builds                                                                  |
| `publish-preview-update.yml`    | Push           | Publishes an update to the branch of the same name                                          |
| `deploy-to-production.yml`      | Push to `main` | Publishes an update when a compatible build exists, otherwise builds the app and submits it |

Updates use the `fingerprint` runtime version, so they only reach builds with the same native code. iOS builds need an Apple Developer account, and store submissions need Apple and Google Play credentials.

## Known limitations

- Tasks can't be edited or deleted yet.
- The profile photo can't be changed yet.
- There are no automated tests yet.
