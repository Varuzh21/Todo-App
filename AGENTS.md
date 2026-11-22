# Todo App — agent guide

A to-do mobile app built with **Expo (SDK 58) + React Native**, using Feature-Sliced Design. Targets **iOS and Android only** (no web). The public mock API **DummyJSON** (`https://dummyjson.com`) is used **only for sign-in**; tasks are stored locally on the device per user (AsyncStorage). Read this file before changing code.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. Before writing code that touches an Expo, EAS, or React Native API:

1. Read the major version of `expo` in `package.json` (currently **58**).
2. Fetch the versioned docs: `https://docs.expo.dev/versions/v58.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt and follow its links. Never answer from memory.

When an API isn't documented (e.g. `expo-router/js-top-tabs`), read its types in `node_modules` before using it.

## Tech stack

| Area            | Library                                                                                                      |
| --------------- | ------------------------------------------------------------------------------------------------------------ |
| Runtime         | Expo SDK 58, React Native 0.88 (New Architecture), React 19.3, TypeScript 6 (strict, `verbatimModuleSyntax`) |
| Routing         | Expo Router 58 (`typedRoutes` on) — `Stack`, JS `Tabs`, `TopTabs` from `expo-router/js-top-tabs`             |
| Server state    | TanStack Query v5                                                                                            |
| HTTP            | axios (one shared instance: `api` from `@/shared/api`)                                                       |
| Validation      | Zod v4                                                                                                       |
| Forms           | Formik + `zod-formik-adapter`                                                                                |
| Token storage   | `expo-secure-store`                                                                                          |
| Task storage    | `@react-native-async-storage/async-storage` (one JSON list per user)                                         |
| Dates           | `date-fns` v4 (weeks start on Monday)                                                                        |
| Lists           | `@shopify/flash-list` v2                                                                                     |
| Bottom sheet    | `@expo/ui/community/bottom-sheet` (native sheet)                                                             |
| Icons           | `react-native-svg` components (no SVG transformer)                                                           |
| Lint / format   | Biome 2 (no ESLint, no Prettier)                                                                             |
| Package manager | **bun** (`bun.lock`)                                                                                         |

**React Compiler is OFF** (removed from `app.json`). Memoize manually where needed: Context provider values (`useMemo`/`useCallback`), `memo` on FlashList item components, `useCallback` for TanStack `select` functions and functions passed to memoized children.

## Commands

```bash
bun install
bunx expo install <package>   # ALWAYS instead of bun add — picks SDK-compatible versions
bunx expo start               # dev server (Metro)
bunx expo start --clear       # after babel/config changes
bun run ios                   # build + run iOS dev build (expo run:ios)
bun run android               # build + run Android dev build
bun run typecheck             # tsc --noEmit
bun run check                 # Biome lint + format check
bun run check:fix             # Biome auto-fix
bunx expo install --check     # dependency versions vs SDK
bunx eas-cli <command>        # EAS CLI
```

**Before declaring any task done: `bun run typecheck` and `bun run check` must pass.** If something needs runtime verification, run it on a simulator/emulator (see "Verifying on a device").

## Native code and builds

- `ios/` and `android/` are generated (Continuous Native Generation) and git-ignored. Never edit them by hand; configure native behavior in `app.json` and config plugins.
- The app uses a **development build** (`expo-dev-client`). After adding a package with native code (e.g. `@expo/ui`, `expo-secure-store`, `react-native-pager-view`), rebuild: `bun run ios` / `bun run android`. JS-only packages (e.g. FlashList v2) need only a reload.
- iOS: if `pod install` fails with a Ruby encoding error, run with `LANG=en_US.UTF-8`.
- Bundle ID / package: `com.varuzhan23.todoapp`. Scheme: `todoapp`. EAS owner: `varuzhan23`.
- `app.json`: `"platforms": ["ios", "android"]`, `userInterfaceStyle: "light"` (light-only app), plugins: `expo-router`, `expo-splash-screen`, `expo-font` (6 fonts), `expo-secure-store`.

### EAS

- Profiles in `eas.json`: `development`, `development-simulator`, `preview`, `production` (with `environment: production`). `appVersionSource: remote`.
- Workflows in `.eas/workflows/`: `create-development-builds.yml`, `publish-preview-update.yml` (OTA update on push, branch = `github.ref_name`), `deploy-to-production.yml` (on push to `main`: fingerprint → reuse build + OTA update, or build + submit).
- iOS device builds need a paid Apple Developer account and credentials (`bunx eas-cli credentials -p ios`); the simulator profile does not.

## Architecture: Feature-Sliced Design

```
src/
├── app/          Expo Router routes + _layout.tsx (FSD "app" layer)
├── screens/      route-level screens (FSD "pages")
├── widgets/      composite UI blocks
├── features/     user actions
├── entities/     business entities
└── shared/       api, config, ui, assets
```

Current slices:

| Layer      | Slices                                                                                                                                                                                                                            |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `screens`  | `welcome`, `sign-in`, `menu`, `task` (3 top-tab screens), `calendar`, `profile`                                                                                                                                                   |
| `widgets`  | `tab-bar` (custom bottom tabs), `top-tab-bar` (custom top tabs), `task-list`, `calendar` (Day/Week/Month tabs, month grid)                                                                                                        |
| `features` | `auth` (sign-in form, sign-out button), `create-task` (FAB, `useCreateTaskSheet`, sheet, form with due date, success view), `toggle-task` (`ToggleTaskCard`: tap to complete/undo), `edit-profile` (profile form, save to device) |
| `entities` | `session` (signed-in state, `useUserId`), `task` (schema, AsyncStorage, queries, `TaskCard`), `user` (`/auth/me`, local profile, `userQueries.profile`)                                                                           |
| `shared`   | `api` (axios, query client, token storage), `config` (theme, fonts), `lib/date` (`toDateKey`), `ui` (Button, Input, DateField, …, icons)                                                                                          |

Rules:

- Imports go **down** only: `app → screens → widgets → features → entities → shared`. Slices on the same layer never import each other.
- Every slice exposes a public API through its `index.ts`. Other layers import only `@/<layer>/<slice>`.
- **Inside a slice use relative imports** (`../api/...`). Importing your own slice through `@/…/<slice>` creates an import cycle (Biome `noImportCycles` errors).
- Segments: `api` (requests, query options), `model` (hooks, state, types), `ui` (components), `lib`, `config`. Existing convention: Zod form schemas live in a `schema/` segment (`features/*/schema/*.schema.ts`).
- Screen files are named `<name>.screen.tsx`. Everything else is kebab-case, one component per file.
- Path alias: only `@/*` → `./src/*`.

## Routing (Expo Router)

```
src/app/
├── _layout.tsx           QueryClientProvider → SessionProvider → StatusBar(dark) → Stack
├── (auth)/               Stack, anchor 'welcome'
│   ├── welcome.tsx
│   └── sign-in.tsx
└── (app)/                Tabs with custom TabBar, anchor 'index', backBehavior 'initialRoute'
    ├── index.tsx         Menu tab  ("/")
    ├── task/             TopTabs with custom TopTabBar + CreateTaskSheet overlay
    │   ├── index.tsx     Behind Schedule ("/task")
    │   ├── upcoming.tsx
    │   └── completed.tsx
    ├── calendar.tsx
    └── profile.tsx
```

- Route files are **one-line re-exports** from `screens`: `export { MenuScreen as default } from '@/screens/menu';`. Every file in `src/app` must default-export a component (empty files cause warnings).
- Auth is done with **`Stack.Protected`** in the root layout: `guard={isSignedIn}` around `(app)` (`redirectTo='/welcome'`), `guard={!isSignedIn}` around `(auth)` (`redirectTo='/'`). There is **no root `app/index.tsx` redirect** — the guards decide the first screen. Never navigate manually after sign-in/out; changing `isSignedIn` redirects.
- Tabs with an `anchor` must use `backBehavior='initialRoute'`.
- Custom tab bars (`widgets/tab-bar`, `widgets/top-tab-bar`): in expo-router 58 the `tabBar` props are `{ state, descriptors, emitter, navigateToTab, insets }` (no `navigation` prop). Emit `tabPress` (preventable) / `tabLongPress` through `emitter` and switch with `navigateToTab(route.key)`.

## Auth and session

- Login: `POST /auth/login` with `{ username, password }` (DummyJSON uses username, not email). Demo account: `emilys` / `emilyspass`.
- Tokens (`accessToken`, `refreshToken`, both validated as JWTs with Zod) are stored in **SecureStore** via `shared/api/token-storage.ts`.
- `shared/api/axios.ts` interceptors: every request reads the access token and sends `Authorization: Bearer …`; a `401` triggers one `POST /auth/refresh` with the refresh token, saves new tokens and retries the original request once (`isRetry` flag, typed in `axios-config.d.ts`). If refresh fails, tokens are cleared.
- The login response's `id` is saved as the user id in SecureStore (`auth.user-id`) next to the tokens; tasks are stored per user id, so no `/auth/me` call is needed for them.
- `entities/session/SessionProvider` reads the token and user id **synchronously** on first render (`getAccessTokenSync`, `getUserIdSync`) so the right screen shows without a flash. A token without a saved user id counts as signed out. It exposes `isSignedIn`, `userId`, `signIn({ accessToken, refreshToken, userId })`, `signOut()` (clears tokens, user id and the query cache). Consume it through `useSession()`; signed-in screens use `useUserId()` (throws when signed out).
- Known gap: when the refresh fails, tokens are cleared but `isSignedIn` stays true until the app restarts.

## Data layer (TanStack Query)

- `shared/api/query-client.ts`: `staleTime: 30_000`, `gcTime: 5 min`, no retries for 4xx (max 2 for network/5xx), mutations don't retry.
- `shared/api/query-managers.ts` connects React Native to TanStack: `focusManager` ← `AppState`, `onlineManager` ← `expo-network`.
- Each entity defines a **key factory with `queryOptions`** in `api/` (e.g. `taskQueries.all()`, `taskQueries.list()`, `userQueries.me()`). Reuse it for `useQuery`, `setQueryData`, `invalidateQueries`, `ensureQueryData`.
- Query/mutation functions go through `api`, pass TanStack's `signal`, and **validate responses with Zod** (axios `data` is `any`).
- **Tasks are local.** `entities/task/api/task-storage.ts` reads/writes one JSON list per user (`tasks.user-<id>`), validated with Zod on read. `taskQueries.list(userId)` and the create mutation use `networkMode: 'always'` — the default `'online'` would pause them offline. After a write, update the list with `setQueryData` (return `undefined` when the list isn't loaded). Every task mutation uses `scope: TASK_STORAGE_MUTATION_SCOPE` so read-modify-write saves run one at a time.
- **Profile:** `userQueries.profile(userId)` returns the profile saved on the device (`profile.user-<id>`) or, the first time, builds it from `/auth/me` (`networkMode: 'offlineFirst'`). Save Changes writes it locally only — DummyJSON's update endpoint does not persist.
- Due dates are local calendar days stored as `yyyy-MM-dd` (`toDateKey` / `fromDateKey` in `shared/lib/date`); string comparison orders them. Status: Behind Schedule = not completed and due before today, Upcoming = not completed and due today or later, Completed = completed.
- Derive per-view data with `select` (wrapped in `useCallback`), e.g. `TaskList` filters one cached list per tab.
- Mutation hooks (`use-sign-in.ts` for the API, `use-create-task.ts` is local):
  - Never copy `data`/`error` into `useState`.
  - `onError` handles every case with early returns (non-axios / no response / API status) for side effects only (dev logging via `__DEV__`); its return value is ignored by TanStack.
  - The displayed `serverError` is **derived during render** from the mutation's `error` (`error.response.data.message`, checked with `typeof`), and returned from the hook. Show the server's own text — don't map server errors to app-written messages.
  - Return only what the UI needs (`mutate` as a named action, `isPending`, `serverError`, …). Local mutations have no server message: `use-create-task` returns `isError` and the form shows its own text.

## Forms

- Formik `<Formik>` component (not `useFormik`), with `validationSchema={toFormikValidationSchema(schema)}`. A raw Zod schema does **not** work as `validationSchema`.
- Formik converts `''` to `undefined` before validation, so required strings use `z.string({ error: 'Enter …' })` plus `.min(1, 'Enter …')`.
- Field errors come from Zod (shown when `touched`); server errors come from the mutation hook's `serverError`. In `onSubmit`, call `schema.parse(values)` to get trimmed/transformed values.

## UI conventions

- Theme tokens only (`shared/config/theme.ts`): `PALETTE` (primary `#2563EB`, success `#3DBEB3`, danger `#C60202`, neutral/neutral50/neutral40, grayLight …), `COLORS` (text, textSecondary, background), `FONTS` (Galano Grotesque, Outfit, GT Walsheim). Fonts load with `useFonts` in the root layout while the splash screen is held.
- Layout with flexbox and `gap`; margin/padding only for screen-edge insets.
- Styles in `StyleSheet.create`; combine with style arrays (`[styles.a, cond && styles.b, style]`). No `clsx` (web-only).
- `shared/ui/Button`: `label`, `icon`, `isLoading` (disables it); `style` is a plain `StyleProp<ViewStyle>`.
- `shared/ui/Input`: `error` message, focus/error borders, built-in password eye toggle for `secureTextEntry`.
- Icons are TSX components in `shared/ui/icons` using `currentColor`; pass `color`. Tab icons are named after their tabs (`MenuIcon`, `TaskIcon`, …).
- Lists: **FlashList v2**. `contentContainerStyle` accepts only padding/background → use `ItemSeparatorComponent` for spacing and render empty states outside the list. v2 enables `maintainVisibleContentPosition` by default, which keeps items prepended at index 0 above the viewport — task lists pass `{ disabled: true }`. Keep `renderItem`/`keyExtractor` at module level, `memo` the item, no `key` on the item root, no `useState` in recycled items (use `useRecyclingState`).
- Bottom sheets: `BottomSheetModal` + `BottomSheetView` from `@expo/ui/community/bottom-sheet` (`ref.present()` / `dismiss()`, `enablePanDownToClose`, `onDismiss`). No providers needed. Native background can't be customized. Open the create-task sheet with `useCreateTaskSheet()` (`openSheet` for any button, `sheetRef` for `<CreateTaskSheet>`); a render prop that calls `openSheet` during render breaks Biome's React Compiler rule.
- Date picker: `shared/ui/DateField` wraps `DateTimePicker` from `@expo/ui/community/datetime-picker`. iOS uses `display='compact'`; Android opens a dialog on mount, so `date-field.android.tsx` mounts it only while open.
- Dropdowns: use `MenuView` from `@expo/ui/community/menu` (native menu; give it `width: '100%'` or it shrinks to its content). `@expo/ui/community/picker` is a **wheel** on iOS and does not fit inside a field row.
- Status bar per screen: tab screens stay mounted, so don't render `<StatusBar />` in a tab screen; use `setStatusBarStyle` in `useFocusEffect` and restore `'dark'` on blur (see `screens/profile/model/use-light-status-bar.ts`).
- Safe area: screens touching the top edge use `SafeAreaView`; screens inside a navigator bar must not (double padding). Custom bars use the `insets` from their props. `<StatusBar style='dark' />` is set once in the root layout.
- On Android, `Pressable` tab items use `android_disableSound`.

## Code style

- Named function declarations for components, hooks and helpers; named exports only (default exports only in `src/app`).
- `interface` when extending a type, `type` otherwise; `import type` for type-only imports; derive types from Zod with `z.infer`.
- Booleans start with `is/has/can/should`. Comments explain _why_, never commented-out code.
- Biome: tabs, single quotes (JSX too), semicolons, trailing commas, `arrowParentheses: asNeeded`, line width 80, kebab-case filenames, `noDefaultExport` (off in `src/app`), `noImportCycles`, `useReactCompiler` (Rules of React).

## Known limitations

- Tasks live only on the device: no sync, no backup, and they stay after sign-out (per user id). DummyJSON todos are not used.
- Tasks can be completed (tap a card to toggle) but not edited or deleted yet.
- Profile: no photo change, side menu, or bell/settings actions yet; edits are saved on the device only.
- Create-task form has a title and a date (Category, Times, Reminder, Repeat from the design are not built).
- Users signed in before the user id was stored are signed out once and must sign in again.
- Formik's last release is Nov 2025 and it has open React 19 issues; it works for the current forms.

## Verifying on a device

- The `agent-device` MCP server is configured in `.mcp.json` for driving simulators/emulators. Several simulators can be booted, so always pass the device/UDID.
- iOS simulator app id: `com.varuzhan23.todoapp`. Metro runs on port `8081`.
- Watch for stale Metro bundles after config changes: restart with `bunx expo start --clear`.

## Git

- Work on `dev`; `main` is production (pushing to `main` triggers the production EAS workflow).
- Commit messages: lowercase imperative summary (e.g. `add task list with TanStack Query, …`) plus a short body.
- Never commit or push unless asked. Never commit secrets (`.env*.local` is ignored).
