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

## 3. `yarn add @nativescript/capacitor` or `npm install @nativescript/capacitor`

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

You can now make changes to anything in `src/nativescript`. 

Then import the `native` object with `import { native } from '@nativescript/capacitor';` into your Ionic web codebase to access it all.

```bash
// After making changes anywhere, build the latest of your web *and* nativescript changes with:
yarn build:mobile

// Then sync with capacitor before running on iOS or Android
npx cap sync
```

## 4. Enjoy 🎉

## Notes

Before installing, ensure you have:

* Followed both the Ionic and Capacitor getting started guides above. Ensure you're using Capacitor 3+ with:

* Run `npx cap init` once as mentioned in the [Capacitor docs](https://capacitorjs.com/docs/getting-started).

* Run `ionic capacitor add ios` and/or `ionic capacitor add android` to create the Capacitor platforms.

* **You can now install @nativescript/capacitor** successfully.




