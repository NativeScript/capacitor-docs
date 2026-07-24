# Migrating v5 to v8

v8 is a ground-up rework of the iOS integration: the NativeScript runtime now arrives as a Swift Package ([NativeScript/ios-spm](https://github.com/NativeScript/ios-spm)) through Capacitor's own SPM plugin flow, and **nothing touches your Xcode project anymore** — no CocoaPods, no Podfile, no AppDelegate edits, no build phases, no custom linker. Metadata ships inside the runtime framework, so there's no generation step unless you opt into custom metadata.

:::warning iOS-only for now

v8 currently supports iOS only. If you need Android, stay on v5 until Android lands in a later 8.x release.

:::

## 1. Remove the v5 integration

From your v5 app, run v5's uninstaller **before** upgrading — it restores the Xcode project changes v5 made:

```bash
npx uninstall-nativescript
npm uninstall @nativescript/capacitor
```

Keep your `src/nativescript` code — it carries over.

## 2. Move your app to Capacitor 8 (SPM)

Follow the official [Capacitor upgrade guide](https://capacitorjs.com/docs/updating/8-0). If your app still uses CocoaPods, migrate the iOS project to SPM first:

```bash
npx cap spm-migration-assistant
```

(or re-scaffold the `ios` platform: remove it, then `npx cap add ios` on Capacitor 8 — SPM is the default template.)

## 3. Install v8

```bash
npm install @nativescript/capacitor@next
npx nscap init
```

`nscap init` scaffolds fresh files but **keeps anything that already exists** — your existing `src/nativescript/index.ts` and `src/native-custom.d.ts` are left untouched.

## 4. Adapt your NativeScript code

Most native TypeScript carries over unchanged. Things to check:

- **Nested project files are gone.** Delete `src/nativescript/package.json`, `tsconfig.json`, and `references.d.ts` — v8 bundles with esbuild directly, and there is no second `npm install`. If you imported from `@nativescript/core`, note that core is not part of the v8 rc bundle.
- **`@NativeClass` decorated classes**: the v8 bundler (esbuild) does not run the webpack NativeClass transformer. On iOS, replace decorated `class X extends NSObject` with the runtime's `NSObject.extend()` API:

```ts
const MyDelegate = NSObject.extend(
  {
    someMethod(arg) { /* ... */ },
  },
  {
    name: 'MyDelegate',
    protocols: [/* e.g. UITextFieldDelegate */],
  },
);
```

- **Deprecated iOS APIs**: v5-era examples used `presentModalViewControllerAnimated`, which no longer exists on modern iOS. Use:

```ts
iosRootViewController().presentViewControllerAnimatedCompletion(vc, true, () => {
  // presented
});
```

- **Bridge helpers**: `iosRootViewController`, `iosAddNotificationObserver`, `iosRemoveNotificationObserver`, `runOnUIThread`, and the event API (`notifyEvent` / `onEvent` / `removeEvent`) all carry over as-is. The Android-only helpers (`androidCreateDialog`, `androidBroadcastReceiverRegister`) return with Android support.

## 5. Update your scripts

Your web `build` script goes back to being just the web build. The v5 extras are replaced by the hook `nscap init` added:

| v5 | v8 |
|---|---|
| `npm run build:mobile` | `npm run build` then `npx cap sync` (hook builds NS automatically) |
| `build:nativescript` → `build-nativescript` | `build:nativescript` → `nscap build` |
| `dev:nativescript` watcher | retired; `npx cap run ios` after edits (live reload on the 8.x roadmap) |
| production webpack flags | not needed (esbuild); minify flag coming in a later 8.x |

## 6. Build and run

```bash
npm run build
npx cap sync ios
npx cap run ios
```

First build downloads the runtime via SPM; after that you're on the normal fast path.
