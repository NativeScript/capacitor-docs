# Building your project

You will find 2 additional npm scripts the plugin added to your project:

```shell
"build:nativescript": "build-nativescript",
"build:mobile": "npm-run-all build build:nativescript"
```

### `build:nativescript`

Used to bundle just your NativeScript changes from `src/nativescript`. It is built into a `nativescript` folder inside your `webDir` as specified in your `capacitor.config.json` or `capacitor.config.ts`.

### `build:mobile`

Used most often. This will always build your web codebase and follow with bundling the NativeScript portion second which is what you will want when preparing your project for Capacitor. You can always follow this command with `npx cap sync` to then update your Capacitor platforms.

Tip: When you were using `npm run build`, you can now simply use `npm run build:mobile` instead and it will achieve what you would want.

