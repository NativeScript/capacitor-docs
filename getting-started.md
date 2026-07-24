# @nativescript/capacitor is now ready

Let's take a look at what you have at your fingertips now.

## `src/nativescript`

Your project now contains a powerful isolated environment.
This is where you can write as much NativeScript as your project needs for various platform features and capabilities.

It is structured as follows:

```
.
├─ src/native-custom.d.ts    // strongly type your own native.* helpers
└─ src/nativescript
   ├─ examples
   │  └─ modal.ts
   └─ index.ts
```

Unlike v5, there is **no nested npm project** — no separate `package.json`, `tsconfig.json`, or second `npm install` inside `src/nativescript`. It's just TypeScript, bundled in milliseconds by `nscap build`.

The `index.ts` alongside the `examples` folder is a great example of how you can scale out native platform features by creating your own organization of additional native helper methods to import and bundle together for your app's usage.

You can make direct native platform API calls here as well as attach additional methods to the `native` object which your web application can use.

### `index.ts`:

The very first line is important, it initializes the Capacitor communication:

```typescript
// keep this import first: it boots the NativeScript bridge
import '@nativescript/capacitor/bridge';
```

This file allows you to organize various native helpers in your own folder structure and bring together into the single bundle which is delivered with your Capacitor app.

[Learn more about the bridge api here](bridge-api)

## Isolated bundle

The `src/nativescript` area of your codebase is completely isolated from the rest of your web codebase. This means you are free to go wild with all sorts of native platform behavior throughout your web application with confidence that the `native` object is only **active** when running on the native platform. It is bundled on its own completely separate from your web build, allowing it to operate purely as an additive power helper to your web app when running via Capacitor.

The bundle is rebuilt automatically on every `npx cap copy` / `npx cap sync` via the `capacitor:copy:before` hook that `nscap init` added — or on demand with `npm run build:nativescript`.

## SDK typings and extra metadata

Two optional power-ups, generated against **your** installed Xcode SDK:

```bash
npx nscap typings     # full iOS SDK TypeScript declarations → src/nativescript/typings/
npx nscap metadata    # custom platform metadata, e.g. to expose extra frameworks
```

By default you don't need `nscap metadata` at all — the standard iOS SDK surface ships inside the runtime's framework. Generate custom metadata only when you want `native.*` access to API surface beyond the standard SDK; declare extra search paths in `src/nativescript/metadata.json` (`frameworkPaths`, `headerPaths`).

## Debugging

Verbose bridge marshalling logs are off by default:

```ts
import { nativeDebug } from '@nativescript/capacitor';
nativeDebug(true);
```
