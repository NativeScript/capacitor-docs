# Doesn't fit your needs?

Removing NativeScript from a Capacitor 8.x app is just removing files — nothing was ever changed in your Xcode project, so there is nothing to restore:

1. `npm uninstall @nativescript/capacitor`
2. Delete `src/nativescript/` and `src/native-custom.d.ts` (or archive them for later)
3. Remove the `build:nativescript` and `capacitor:copy:before` scripts from your `package.json`
4. `npx cap sync ios`

:::tip v5 note

The v5 `uninstall-nativescript.js` restore script is no longer needed — it existed to undo v5's Xcode project modifications, and 8.x never makes any.

:::

If anything doesn't clean up as expected, let us know [here](https://github.com/NativeScript/capacitor/issues).
