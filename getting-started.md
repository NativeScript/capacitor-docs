# @nativescript/capacitor is now ready

Let's take a look at what you have at your fingertips now.

## `src/nativescript`

Your project now contains a powerful isolated environment.
This is where you can write as much NativeScript as your project needs for various platform features and capabilities.

It is structured as follows:

```
.
├─ src/nativescript
   └─ examples
      ├─ modal.ts
      └─ simple.ts
   ├─ index.ts
   ├─ package.json
   ├─ references.d.ts
   └─ tsconfig.json
```

The `index.ts` alongside the `examples` folder is a great example of how you can scale out native platform features by creating your own organization of additional native helper methods to import and bundle together for your app's usage.

You can make direct native platform API calls here as well as attach additional methods to the `native` object which your Ionic application can use.

### `index.ts`:

The very first line is important, it initializes the Capacitor communication:

```typescript
// init - keep here.
import '@nativescript/capacitor/bridge';
```

This file allows you to organize various native helpers in your own folder structure and bring together into the single bundle which is delivered with your Capacitor app.

[Learn more about the bridge api here](bridge-api)

## Isolated bundle

The `src/nativescript` area of your codebase is completely encapsulated and isolated from the rest of your web codebase. This means you are free to go wild with all sorts of native platform behavior and even make calls with the `native` object throughout your Ionic application with confidence knowing that the `native` object is *only* alive when running on the actual mobile platform. It is bundled on it's own completely separate from your web build allowing it to operate purely as an additive power helper to your web app when running via Capacitor.

[Learn more about how to optimize this bundle for production here](production-tips)







