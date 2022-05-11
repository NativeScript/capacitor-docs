# Installing @nativescript/capacitor

## 1. Follow the [Ionic Getting Started Guide](https://ionicframework.com/getting-started)

## 2. Follow the [Capacitor Getting Started Guide](https://capacitorjs.com/docs/getting-started)

:::tip Note

Compatible with Capacitor 3+

We recommend using [yarn](https://classic.yarnpkg.com/en/) to install dependencies in your project.

:::

```bash
// Ensure you have added iOS and Android platforms to your Capacitor app

ionic capacitor add android
ionic capacitor add ios
```

## 3. Install @nativescript/capacitor

`yarn add @nativescript/capacitor` or `npm install @nativescript/capacitor`?

:::tip Note

Using `yarn` can help with project dependency issues. If you encounter a webpack build error you can try clearing your `node_modules` and `package-lock.json` and using `yarn` to install your dependencies instead.

If you are using npm 7+, you may see this prompt during install:

```
Need to install the following packages:
  webpack
Ok to proceed? (y)
```

You can just type `y` and hit enter to proceed.

:::

## 4. Success

1. You can now make changes to anything in `src/nativescript`. 
2. In addition to using those utilities via the `native` import throughout your Ionic web codebase to access any NativeScript you write:

```ts
import { native } from '@nativescript/capacitor';
```

You can build both your Web app and NativeScript via:

```bash
yarn build:mobile
```

Then sync with Capacitor before running on iOS or Android:

```
npx cap sync
```

### Notes

Before installing, ensure you have:

* Followed both the Ionic and Capacitor getting started guides above. Ensure you're using Capacitor 3+ with:

* Run `npx cap init` once as mentioned in the [Capacitor docs](https://capacitorjs.com/docs/getting-started).

* Run `ionic capacitor add ios` and/or `ionic capacitor add android` to create the Capacitor platforms.

* **You can now install @nativescript/capacitor** successfully.

## Troubleshooting

Whenever you `npx cap sync` you may encounter any of the following errors:

### Potential error 1

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

### Potential error 2

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


### Potential error 3

For Android, if you see an error like this in Logcat: 

```bash
07:39:02.434 18398-18398/? E/TNS.error: metadata folder couldn't be opened! (Error: 2)
```

**Solution** 

You can delete the `android/app/src/main/assets/metadata` folder and rerun.

