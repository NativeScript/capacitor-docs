# Building your project

Some additional npm scripts the plugin added to your project:

```shell
"build:nativescript": "build-nativescript",
"build:mobile": "npm-run-all build build:nativescript"
```

### `build:nativescript`

Used to bundle just your NativeScript changes from `src/nativescript`. It is built into a `nativescript` folder inside your `webDir` as specified in your `capacitor.config.json` or `capacitor.config.ts`.

### `build:mobile`

This will always build your web codebase and follow with bundling the NativeScript portion second which is what you will want when preparing your project for Capacitor. You can always follow this command with `npx cap sync` to then update your Capacitor platforms.

Tip: When you were using `npm run build`, you can now simply use `npm run build:mobile` instead and it will achieve what you would want.

## Building .android and .ios files

When organizing NativeScript by `.android.ts` and `.ios.ts` files -- something we recommend when building out a lot of NativeScript, [see more here](https://docs.nativescript.org/best-practices/platform-file-split-or-not.html), we can expand our build scripts to handle each. Doing so will create optimized bundle's with only the specific platform code in them, for example, instead of the default build scripts, we can expand them to handle each:

```json
{
    "scripts": {
        "build:nativescript:android": "build-nativescript --env=platform=android",
        "build:nativescript:ios": "build-nativescript --env=platform=ios",
        "build:mobile:android": "npm-run-all build build:nativescript:android",
        "build:mobile:ios": "npm-run-all build build:nativescript:ios"
    }
}
```

These are purely suggestions and you are welcome to setup your scripts anyway you wish.
