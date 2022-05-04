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

## Troubleshooting

Whenever you `npx cap sync` you may encounter any of the following errors:

### Searching for inspections failed: undefined method `map' for nil:NilClass

```
✖ Updating iOS native dependencies with pod install - failed!
✖ update ios - failed!
[error] Analyzing dependencies
        Downloading dependencies
        Installing NativeScript (0.6.2)
        Installing NativeScriptUI (0.1.1)
        Installing NativescriptCapacitor 2.0.0
        objc[64468]: Class AMSupportURLConnectionDelegate is implemented in both /usr/lib/libauthinstall.dylib
        (0x21f712b90) and /Library/Apple/System/Library/PrivateFrameworks/MobileDevice.framework/Versions/A/MobileDevice
        (0x103de42c8). One of the two will be used. Which one is undefined.
        objc[64468]: Class AMSupportURLSession is implemented in both /usr/lib/libauthinstall.dylib (0x21f712be0) and
        /Library/Apple/System/Library/PrivateFrameworks/MobileDevice.framework/Versions/A/MobileDevice (0x103de4318).
        One of the two will be used. Which one is undefined.
        Searching for inspections failed: undefined method `map' for nil:NilClass
```

**Solution**

This is known to happen on Mac M1 depending on your setup. You can run the following to correct it:

```
brew upgrade && sudo xcode-select -r
```

That should ensure system dependencies are correct and xcode default path is reset properly.

### Nanaimo::Reader::ParseError

```bash
Nanaimo::Reader::ParseError - [!] Found additional characters after parsing the root plist object
 #  -------------------------------------------
1>  version https://git-lfs.github.com/spec/v1
            ^
 #  oid sha256:e385dc25878dba8bf63a4ec695d935413db579efc88328284d0dfbc4d440c08d
 #  size 1463
 #  -------------------------------------------
```

**Solution**

> Please check if you have git-lfs installed and clear cocoapod cache before running install again

> To clear cache please go to ~/Library/Caches/Cocoapods/ and remove Amity SDK folder - you should be able to run a clean install afterward

Context: https://community.amity.co/t/found-additional-characters-after-parsing-the-root-plist-object-nanaimo-parseerror/143