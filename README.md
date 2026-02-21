# Todo App

A modern, cross-platform mobile todo application built with React Native and TypeScript. The app helps users organize tasks, track progress, and manage their daily activities with an intuitive interface featuring authentication, local storage, and calendar integration.


---

## Overview

This Todo App is a mobile application that helps people stay organized and productive. Users can create tasks, set deadlines, mark items as complete, and view their tasks in a calendar format. The app works offline, so users don't need an internet connection to manage their tasks. It features a clean, modern design with smooth animations and an easy-to-use interface.

**Value & Impact:**
- Improves personal productivity and task management
- Works offline, ensuring tasks are always accessible
- Provides multiple ways to view and organize tasks (list view, calendar view)
- Secure user authentication protects personal data
- Fast and responsive user experience

---

## App Demo Video

[Watch App Demo](https://drive.google.com/file/d/1Nz2b-2twVxJyLYgUdxTihCJC5OnyOSqQ/view)

---

## Key Features

- **User Authentication** - Secure sign-in with email/password and social login options (Google, Apple)
- **Task Management** - Create, edit, complete, and delete tasks with title, description, date, and time
- **Search Functionality** - Quickly find tasks by searching through titles and descriptions
- **Calendar View** - Visual calendar interface to schedule and view tasks by date
- **Offline Storage** - All tasks are saved locally on the device, ensuring data persistence
- **Task Organization** - Group tasks by completion status (incomplete/completed)
- **Modern UI** - Gradient backgrounds, smooth animations, and intuitive navigation

---

## Tech Stack

**Core:**
- React Native 0.83.1
- React 19.2.0
- TypeScript 5.9.3

---

## How It Works

**High-Level Architecture:**

1. **Authentication Flow**: Users sign in via email/password or social providers. The app stores authentication tokens securely and attaches them to API requests.

2. **Task Storage**: Tasks are stored locally using MMKV (a fast key-value storage solution), ensuring data persists between app sessions without requiring cloud connectivity.

3. **Navigation Structure**: The app uses a bottom tab navigator with four main sections:
   - **Home**: Dashboard showing user profile, grouped tasks, and quick overview
   - **Tasks**: Full task list with search and task creation via bottom sheet
   - **Calendar**: Calendar view for scheduling and viewing tasks by date
   - **Settings**: User profile and app settings

4. **State Management**: React Context providers (`AuthStore`, `TodoStore`) manage global application state, making data accessible across all screens.

5. **Component Architecture**: Reusable UI components (Button, Input, TaskItem, etc.) ensure consistency and maintainability.

---

## Getting Started

### Prerequisites

- Node.js >= 20
- React Native development environment set up
  - For Android: Android Studio, JDK, Android SDK
  - For iOS: Xcode, CocoaPods (macOS only)
- See [React Native Environment Setup](https://reactnative.dev/docs/set-up-your-environment) for detailed instructions

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Todo-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install iOS dependencies** (iOS only)
   ```bash
   cd ios
   bundle install
   bundle exec pod install
   cd ..
   ```

### Running the App

**Start Metro bundler:**
```bash
npm start
```

**Run on Android:**
```bash
npm run android
```

**Run on iOS:**
```bash
npm run ios
```

### Available Scripts

- `npm start` - Start Metro bundler
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS simulator/device
- `npm test` - Run Jest tests
- `npm run lint` - Run ESLint
