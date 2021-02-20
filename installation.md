# Installing @nativescript/capacitor

1. Follow the [Ionic Getting Started Guide](https://ionicframework.com/getting-started)

2. Follow the [Capacitor Getting Started Guide](https://capacitorjs.com/docs/getting-started)

**NOTE**: This is for Capacitor 3 which is also in beta right now, use `next`:

```
npm install @capacitor/cli@next @capacitor/core@next @capacitor/android@next @capacitor/ios@next

// build at least once before adding platforms
npm run build 

npx cap add android
npx cap add ios

npx cap sync
```

3. `npm i @nativescript/capacitor`

You can now make changes to anything in `src/nativescript`. 

Then import the `native` object with `import { native } from '@nativescript/capacitor';` into your Ionic web codebase to access it all.

```
// After making changes anywhere, build the latest of your web *and* nativescript changes with:
npm run build:mobile

// Then sync with capacitor before running on iOS or Android
npx cap sync
```

4. Enjoy 🎉

## Notes

Before installing, ensure you have:

* Followed both the Ionic and Capacitor getting started guides above. Ensure you're using Capacitor 3 beta with:

```
npm install @capacitor/cli@next @capacitor/core@next @capacitor/android@next @capacitor/ios@next
```

* Run `npx cap init` once as mentioned in the Ionic/Capacitor docs.

* Run `npm run build` at least once which generates the output needed to be able to add the Capacitor mobile platforms.

* Run `npx cap add ios` and/or `npx cap add android` to create the Capacitor platforms.

* **You can now install @nativescript/capacitor** successfully.


