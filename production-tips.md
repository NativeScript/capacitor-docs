# Production Tips

The 8.x pipeline bundles your `src/nativescript` code with esbuild — output is already compact and tree-shaken, and there is no separate "production mode" to configure.

A few notes for release builds:

* **Debug logging is already off by default.** Verbose bridge marshalling logs only appear if you call `nativeDebug(true)` — make sure you're not shipping that call.

* **Metadata footprint.** The platform API metadata (~8–12 MB) lives in your app bundle whether it comes from the NativeScript framework (default) or from `nscap metadata`. This matches the footprint every NativeScript app has always had — it *is* the map of the platform APIs.

* **NativeScript `console.log` output** goes to the system log in release builds too; strip or gate any noisy logging in your native helpers before shipping.

:::tip v5 note

The v5 webpack flags (`--env=uglify=true`, `--env=production=true`) no longer exist — esbuild replaced the webpack pipeline. Bundle minification lands as an `nscap build` flag in a follow-up 8.x release.

:::
