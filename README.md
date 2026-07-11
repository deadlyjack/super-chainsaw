# Proteus

A minimal hybrid app template — one codebase, three platforms.

## Getting Started

```bash
pnpm install
npm run dev browser   # opens in browser at https://localhost:7977
npm run dev ios       # opens Xcode project
npm run dev android   # builds and runs on connected device
```

## Project Structure

```
src/                        # Application source
  App.tsx                   # Root component (theme toggle + counter)
  main.ts                   # Entry point
  boot.ts                   # Platform detection + bootstrap
  components/
    Counter.tsx              # Default counter app
  themes/
    dark.ts / light.ts       # Theme definitions
  lib/                       # Shared utilities
  bridge/                    # Platform API abstraction
  platforms/                 # Platform-specific JS setup
    android/ | ios/ | browser/
dev/                        # Build tooling
  start.js                   # Dev server launcher
  build.js                   # Production build
  sync.js                    # Config sync (package.json → platform files)
platforms/
  android/                   # Android native project
  ios/                       # iOS native project (Xcode)
    runner/                  # Swift source
    runner.xcodeproj/        # Xcode project
    Config.xcconfig          # Development team (gitignored)
  browser/                   # Browser PWA output
```

## Configuration

Edit `package.json` — it's the single source of truth:

```json
{
  "name": "com.example.myapp",
  "displayName": "My App",
  "version": "1.0.0",
  "versionCode": 1
}
```

These values auto-propagate to all platform configs on every `npm run dev` or `npm run build`.

## Platform Setup

### iOS

Create `platforms/ios/Config.xcconfig` with your Apple Team ID:

```
DEVELOPMENT_TEAM = ABC123XYZ
```

This file is gitignored. Open `runner.xcodeproj` in Xcode to build and run.

### Android

Open `platforms/android/` in Android Studio, or use:

```bash
npm run dev android
```

Set your signing key and keystore in `platforms/android/app/build.gradle`.

### Browser

Runs as a PWA with service worker, OPFS storage, and HTTPS via webpack-dev-server.

```bash
npm run dev browser
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev [platform]` | Start dev server + platform |
| `npm run dev:release [platform]` | Dev server in production mode |
| `npm run build [platform]` | Production build |
| `npm test` | Run all tests (Jest) |
| `npm run typecheck` | TypeScript check |
| `npm run format` | Format with Biome |

## Testing

```bash
npm test
```

- **`dev/__tests__/sync.test.ts`** — Config sync: version, namespace, display name, pbxproj, Android resources
- **`src/components/__tests__/Counter.test.tsx`** — Counter component: increment, reset, persistence
- **`src/__tests__/App.test.tsx`** — App root: theme toggle, counter rendering

## Customizing

The default app is a click counter. Replace `src/components/Counter.tsx` with your own code and update `src/App.tsx`.

The iOS project is `platforms/ios/runner/` and Android Java source is `platforms/android/app/src/main/java/runner/` — both use generic names. Rename the app via `package.json` without touching native code.

## Tech Stack

- **Frontend**: React 19, TypeScript, SCSS, Tailwind CSS
- **Build**: Webpack 5, Babel, React Compiler
- **iOS**: Swift + SwiftUI, WKWebView
- **Android**: Java, WebView, Gradle
- **Test**: Jest, Testing Library
- **Format**: Biome
