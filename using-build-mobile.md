# Building your project

`nscap init` adds these npm scripts to your project:

```json
"build:nativescript": "nscap build",
"capacitor:copy:before": "nscap build"
```

### `build:nativescript`

Bundles just your NativeScript changes from `src/nativescript`. It is built into a `nativescript` folder inside your `webDir` as specified in your `capacitor.config.json` or `capacitor.config.ts`. Bundling uses esbuild and completes in milliseconds.

### `capacitor:copy:before`

This is a [Capacitor CLI hook](https://capacitorjs.com/docs/cli/hooks): it runs automatically **before every** `npx cap copy` and `npx cap sync`. In practice you never have to think about the NativeScript build at all — your regular Capacitor workflow keeps everything in sync:

```bash
npm run build       # your web build, as usual
npx cap sync ios    # nscap build runs automatically, then Capacitor copies everything
```

:::tip Coming from v5?

The v5 `build:mobile` / `npm-run-all` scripts are no longer needed — the hook replaces them. Keep using your plain web `build` script.

:::

## Custom metadata rides along

If you've generated custom platform metadata with `npx nscap metadata`, `nscap build` automatically bundles it alongside your NativeScript code. Without it, the runtime uses the SDK metadata bundled inside the NativeScript framework — the build output tells you which is in effect:

```
⚡ nscap: built dist/nativescript/index.js · framework-bundled SDK metadata (zero-config)
```
