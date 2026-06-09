# AGENTS.md

Guidance for agents working in this repository.

## Project

`omc` (Olmosq Staff) is a React Native tablet app for the Olmosq QR coffee
ordering system. Staff use it to manage orders, payments, shifts, and cash
drawer operations in landscape orientation. It talks to a separate Node.js
backend over REST + WebSocket.

- React Native 0.85.3, React 19.2.3, TypeScript 5.x
- Android is the primary target (iOS scaffolding exists but is not the focus)
- Tablet, landscape-locked

## Commands

```bash
npm start              # Start Metro bundler
npm run android        # Build + run on Android device/emulator
npm run ios            # Build + run on iOS
npm run lint           # ESLint
npm test               # Jest
```

Run a single test: `npx jest path/to/file.test.tsx` or `npx jest -t "name"`.

Reset Metro cache when bundler acts up: `npx react-native start --reset-cache`.
Clean Android build: `cd android && ./gradlew clean`.

## Architecture

```
src/
  api/         # Per-domain API modules (orders.api.ts, auth.api.ts, ...)
  config/      # api.ts: baseURL, endpoint map (API_ENDPOINTS)
  components/  # common/, dashboard/, layout/, orders/ - reusable UI
  hooks/       # React Query + domain hooks (useOrders, useAuth, useWebSocket)
  navigation/  # AppNavigator.tsx - native-stack, auth-gated
  screens/     # Screen components grouped by domain
  services/    # api.ts (axios client), authService, tokenService
  store/       # Zustand stores (authStore)
  types/       # api.types.ts, navigation.types.ts
  utils/       # designTokens.ts, constants.ts, formatting.ts
```

Data flow: screens → hooks (React Query) → `api/*.api.ts` → `services/api.ts`
(axios client with auth + refresh interceptors) → backend.

- **Server state**: React Query (`@tanstack/react-query`). Orders poll every 5s
  and also update live via WebSocket (`useWebSocket`).
- **Client/auth state**: Zustand (`store/authStore.ts`).
- **Auth**: JWT Bearer tokens. `services/api.ts` attaches the token and handles
  401 refresh automatically. Tokens stored via `tokenService` (react-native-keychain).
- **Navigation**: single native-stack in `AppNavigator.tsx`, gated on
  `isAuthenticated`. Add new screens to both the navigator and
  `RootStackParamList` in `types/navigation.types.ts`.

Note: there are two API config surfaces. `src/config/api.ts` (used by
`services/api.ts`) is the active one; `src/utils/constants.ts` re-exports an
older `API_CONFIG` plus status enums. Prefer `config/api.ts` and `API_ENDPOINTS`
for endpoint work.

## Conventions

- **TypeScript** everywhere. Functional components typed as
  `React.FC<SomeProps>`; props via an `interface`.
- **Named exports** for components/screens (e.g. `export const OrdersScreen`),
  not default exports.
- **Styling**: `StyleSheet.create` at the bottom of each file. Never hardcode
  colors, spacing, radii, or type. Always pull from
  `src/utils/designTokens.ts`: `COLORS`, `SPACING`, `BORDER_RADIUS`,
  `TYPOGRAPHY`, plus `SHADOWS_IOS`/`getShadowStyle`, `getStatusColor`,
  `getStatusLabel`.
- **Prettier**: single quotes, trailing commas (`all`), `arrowParens: avoid`.
- **ESLint**: `@react-native` config. Run `npm run lint` before finishing.
- File naming: components/screens `PascalCase.tsx`; api/hooks/services
  `camelCase.ts` (api modules use `.api.ts`).
- Each file starts with a short block comment describing its purpose (match the
  existing style).

## UI components

The app uses a **hybrid** component strategy: React Native Paper for standard
primitives, custom components for branded/specialized UI.

- **React Native Paper**: wrapped behind existing component APIs so callers are
  unchanged. `PaperProvider` is set up in `App.tsx` with `customTheme` from
  `src/theme/paperTheme.ts`, which maps the Stitch tokens (colors, Hanken
  Grotesk fonts, roundness) onto RNP's `MD3LightTheme`.
  - `components/common/Button.tsx` wraps RNP `Button`; preserves the 6 variants
    (`primary`, `secondary`, `tonal`, `danger`, `outline`, `ghost`) by mapping
    them to RNP modes + token colors.
  - `components/common/Card.tsx` wraps RNP `Card`/`Surface` (variants:
    `default`, `outlined`, `elevated`, `tonal`).
  - `components/common/StatusBadge.tsx` wraps RNP `Chip`.
- **Kept custom** (branded/specialized, do NOT replace with RNP): `GlassCard`,
  `NavigationRail`, `TopAppBar`/`OrderDetailAppBar`, `LoginScreen` form,
  `MenuManagementScreen` search.
- **Lists**: use `@shopify/flash-list` (`FlashList`) for large/growing lists
  (orders, shift history). FlashList v2 auto-measures — do NOT pass
  `estimatedItemSize`. Small/fixed content stays on `ScrollView`.
- **Icons**: `lucide-react-native` for newer custom UI; `react-native-vector-icons`
  MaterialCommunityIcons (via `MaterialIcon`) for everything else and RNP.

## Design system

Sage-green light theme sourced from a Stitch design system (see
`designTokens.ts` header). Primary `#A7C472`. Order workflow has dedicated
status colors/labels via `getStatusColor` / `getStatusLabel`. Touch targets
default to 48px (`SPACING.touchTarget`). Context for design decisions lives in
`.impeccable/PRODUCT.md` and `.impeccable/DESIGN.md`.

## Backend

The app requires a running backend (default dev URL `http://192.168.0.73:3001/api`
in `src/config/api.ts`). Update `DEV_API_URL` / WS URL for your machine's IP.
Emulator uses `10.0.2.2` to reach the host. See `README.md` and `docs/` for the
full endpoint and WebSocket contract.

## Notes

- Don't commit unless asked. Branch is `main`.
- More docs in `docs/`: `QUICK_START.md`, `DEVELOPMENT.md`, `BACKEND_GUIDE.md`,
  `IMPLEMENTATION.md`.
