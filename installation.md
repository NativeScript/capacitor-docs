# Installing @nativescript/capacitor

:::tip Version note

**8.x** is SPM-first and works with **Capacitor 8** apps (or Capacitor 6/7 apps using [SPM mode](https://capacitorjs.com/docs/ios/spm)). This release is **iOS-only**; Android support returns in a later 8.x release.

Using CocoaPods or need Android today? Use `@nativescript/capacitor@5` and the v5 docs.

:::

There is no project surgery in 8.x: no CocoaPods, no Podfile edits, no AppDelegate changes, no Xcode build phases, no linker flags. The NativeScript runtime arrives as a Swift Package ([NativeScript/ios-spm](https://github.com/NativeScript/ios-spm)) when Capacitor syncs the plugin, and platform API metadata ships inside the runtime's framework — zero configuration.

## 1. Start from a Capacitor app

Follow the [Ionic](https://ionicframework.com/getting-started) or [Capacitor](https://capacitorjs.com/docs/getting-started) getting started guide, and make sure the iOS platform is added:

```bash
npx cap add ios
```

## 2. Install and initialize

```bash
npm install @nativescript/capacitor
npx nscap init
```

`nscap init` is **additive and idempotent** — it only creates files and npm scripts, never touching your Xcode project:

- `src/nativescript/index.ts` — your native TypeScript entry, with a working native modal example
- `src/native-custom.d.ts` — strongly type your own `native.*` helpers
- npm scripts that wire `nscap build` into Capacitor's `capacitor:copy:before` hook, so your native code builds automatically on every `npx cap copy` / `npx cap sync`

## 3. Build and run

```bash
npm run build       # build your web assets as usual (any bundler)
npx cap sync ios
npx cap run ios
```

That's the entire setup. At app launch you'll see the example's greeting in the native console, and from your web code you can immediately do:

```ts
import { native } from '@nativescript/capacitor';

const version = await native.UIDevice.currentDevice.systemVersion.get;
native.openNativeModalView(); // the scaffolded example helper
```

## Requirements

- Capacitor 8 iOS app (SPM is the Capacitor 8 default) — or Capacitor 6/7 with [SPM mode](https://capacitorjs.com/docs/ios/spm)
- iOS 15+, Xcode with the iOS SDK
- Node 18+

## Troubleshooting

### Blank webview after adding NativeScript

If the app launches to a blank screen, your web assets were likely never built — run your web build (e.g. `npm run build`) before `npx cap sync`. The NativeScript build hook creates the web assets folder, which can mask Capacitor's usual "web assets directory not found" error on brand-new apps.

### Where do my NativeScript `console.log`s go?

To the native system log, not the webview console. See them in the Xcode console, or:

```bash
# simulator
xcrun simctl spawn booted log stream --predicate 'process == "App"'
```

### First build is slow

The very first Xcode build downloads the NativeScript runtime binaries through Swift Package Manager. Subsequent builds use the local SPM cache and are fast.
