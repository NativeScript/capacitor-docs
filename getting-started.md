# @nativescript/capacitor is now ready

Let's take a look at what you have at your fingertips now.

## src/nativescript

Your project now contains a `src/nativescript` folder.
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

The `index.ts` alongside the `examples` folder is a great example of how you can scale out native platform features by creating your own organization of additional native helper methods to import and bundle together for you app's usage.

You can make direct native platform API calls here as well as attach additional methods to the `native` object which your Ionic application can use.

This isolated segment of your codebase has 0 effect on your web application when running outside the native platform. This means you are free to go wild with all sorts of native platform behavior and even make calls with the `native` object throughout your Ionic application with confidence knowing that the `native` object is *only* alive when running on the actual mobile platform. It is simply ignored and deactivated when running your app solely in a web browser outside of Capacitor.

## Explaining the examples

The installation includes 2 simple examples to give you ideas of possibilities. 




