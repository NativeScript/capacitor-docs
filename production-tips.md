# Production Tips

You can add 2 additional flags to your NativeScript build when preparing your app for production.

* `--env.uglify=true` Minifies the bundle.

* `--env.production=true` Bundles with webpack's production mode on.

You can either add these to the provide build script or create your own production npm scripts, for example in your `package.json` scripts:

```shell
"build:nativescript:prod": "build-nativescript --env.uglify=true --env.production=true",
"build:mobile:prod": "npm-run-all build build:nativescript:prod"
```