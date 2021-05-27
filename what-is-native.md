# What is 'native'?

The `native` object which `@nativescript/capacitor` provides is a [JavaScript Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy).

This allows the api to be *active* only when run on the native platform via Capacitor. Otherwise it is completely *inactive* when used inside a standalone web browser.

The Proxy also allows each "dot notation" from it to translate and marshall "in real time" to your native platform.

## Quick access

Using the `native` object is meant to be a quick access utility to anything you need from your native platform. It's also intended to be expanded upon with your own helper methods as you see fit.

It exposes platform API's as made public by each native platform.

All native properties which handle "primitive" types (string, number, boolean) use a standard interface for fetching native values from your platform device:

```typescript
export interface NativeProperty<T> {
  get: Promise<T>
  set: (value: T) => Promise<void>
}
```

This means if you want to get your current device screen brightness, you could use something like this on iOS for example:

```typescript
const value = await native.UIScreen.mainScreen.brightness.get;
console.log(value); // your screen brightness value
```

And if you want to set the brightness:

```typescript
native.UIScreen.mainScreen.brightness.set(.8); 
```

