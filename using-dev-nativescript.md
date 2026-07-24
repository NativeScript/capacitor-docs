# Development Workflow

The NativeScript bundle rebuilds automatically as part of your normal Capacitor loop — the `capacitor:copy:before` hook runs `nscap build` (milliseconds) on every copy/sync:

```bash
# after editing anything in src/nativescript
npx cap run ios
```

That's it: `cap run` syncs (rebuilding your NativeScript bundle via the hook), builds, and deploys.

For web-side changes, use your framework's dev server as usual — the `native` object is simply inactive in a plain browser, so your web dev loop is unaffected.

:::tip v5 note

The v5 `dev:nativescript` watcher CLI has been retired. On-device live reload of NativeScript code (without reinstalling the app) is on the 8.x roadmap via TKLiveSync, which already ships with the runtime.

:::
