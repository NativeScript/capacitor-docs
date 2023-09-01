# Installing @nativescript/capacitor

## 1. Follow the [Ionic](https://ionicframework.com/getting-started) or [Capacitor](https://capacitorjs.com/docs/getting-started) Getting Started Guide

:::tip Note

Compatible with Capacitor 5+

:::

```bash
// Ensure you have added iOS and Android platforms to your Capacitor app

npx cap add android
npx cap add ios
```

## 2. Install @nativescript/capacitor

```bash
npm install @nativescript/capacitor
```

## 3. Success

1. You can now make changes to anything in `src/nativescript`. 
2. In addition to using those utilities via the `native` import throughout your web codebase to access any NativeScript you write:

```ts
import { native } from '@nativescript/capacitor';
```

You can build both your Web app and NativeScript via:

```bash
npm run build:mobile
```

Then sync with Capacitor before running on iOS or Android:

```
npx cap sync
```

### Notes

Before installing, ensure you have:

* Followed the Ionic or Capacitor getting started guides above. Ensure you're using Capacitor 5+.

* Run `npx cap init` once as mentioned in the [Capacitor docs](https://capacitorjs.com/docs/getting-started).

* Run `npx cap add ios` and/or `npx cap add android` to create the Capacitor platforms.

* **You can now install @nativescript/capacitor** successfully.

## Troubleshooting

Whenever you `npx cap sync` you may encounter any of the following errors:

### Potential error 1

```bash
Analyzing dependencies
[!] Unable to satisfy the following requirements:

- `NativeScriptSDK (~> 8.4.2)` required by `Podfile`

None of your spec sources contain a spec satisfying the dependency: `NativeScriptSDK (~> 8.4.2)`.

You have either:
 * out-of-date source repos which you can update with `pod repo update`.
 * mistyped the name or version.
 * not added the source repo that hosts the Podspec to your Podfile.

Note: as of CocoaPods 1.0, `pod repo update` does not happen on `pod install` by default.
```

**Solution**

Run: `pod repo update`, then run `npx cap sync` again.

### Potential error 2

```
✖ Updating iOS native dependencies with pod install - failed!
✖ update ios - failed!
[error] Analyzing dependencies
        Downloading dependencies
        Installing NativeScript (8.3.3)
        Installing NativeScriptUI (0.1.1)
        Installing NativescriptCapacitor 4.0.0
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

### Potential error 3

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


### Potential error 4

For Android, if you see an error like this in Logcat: 

```bash
07:39:02.434 18398-18398/? E/TNS.error: metadata folder couldn't be opened! (Error: 2)
```

**Solution** 

You can delete the `android/app/src/main/assets/metadata` folder and rerun.

### Potential error 5

For iOS, after your very first `npx cap sync` and then running the iOS app you may see an error like this in Xcode:

```bash
Build input file cannot be found: '/Users/{username}/Library/Developer/Xcode/DerivedData/App-eipugnxycvymmgcaaenuujqazunt/Build/Products/Debug-iphonesimulator/metadata-arm64.bin'. Did you forget to declare this file as an output of a script phase or custom build rule which produces it?
```

**Solution** 

Just run again. This error can occur on a very first fresh run while Xcode is preparing the project.

