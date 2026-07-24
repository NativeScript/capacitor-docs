# Migrating v5 to v8

v8 is a ground-up rework of both platform integrations, and **nothing touches your native projects anymore**:

- **iOS**: the NativeScript runtime arrives as a Swift Package ([NativeScript/ios-spm](https://github.com/NativeScript/ios-spm)) through Capacitor's own SPM plugin flow (no CocoaPods, no Podfile, no AppDelegate edits, no build phases, no custom linker). Metadata ships inside the runtime framework.
- **Android**: the plugin is a self-contained Gradle module meaning no `Application` replacement, no manifest edits, no `build.gradle` grafting, no binaries copied into your repo, and **no Static Binding Generator** (the runtime generates bindings dynamically). `nscap build` fetches the runtime once and generates metadata automatically.

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

On Android, `SomeClass.extend({...})` and `new SomeInterface({...})` work at runtime via the runtime's dynamic binding generation — no build step, no SBG.

- **Deprecated iOS APIs**: v5-era examples used `presentModalViewControllerAnimated`, which no longer exists on modern iOS. Use:

```ts
iosRootViewController().presentViewControllerAnimatedCompletion(vc, true, () => {
  // presented
});
```

- **Bridge helpers**: `iosRootViewController`, `iosAddNotificationObserver`, `iosRemoveNotificationObserver`, `runOnUIThread`, the event API (`notifyEvent` / `onEvent` / `removeEvent`), and `global.androidCapacitorActivity` all carry over as-is. The v5 convenience wrappers `androidCreateDialog` and `androidBroadcastReceiverRegister` are not in the rc yet — use direct platform APIs meanwhile (e.g. `android.app.AlertDialog.Builder`, as the scaffolded modal example shows).

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
npx cap sync
npx cap run ios     # and/or: npx cap run android
```

The first iOS build downloads the runtime via SPM, and the first `nscap build` with an Android platform fetches the Android runtime; after that you're on the normal fast path.
