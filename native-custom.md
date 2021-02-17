# native-custom.d.ts

You can attach as many custom utilities to the "native" object as your project demands.

When adding your own native helpers, you can expand this interface to provide strong type checking for extra utilities you add to your project.

```typescript
import type { NativeProperty } from '@nativescript/capacitor';

declare module '@nativescript/capacitor' {
  export interface customNativeAPI extends nativeCustom {}
}

/**
 * Define your own strongly typed native helpers here.
 */
export interface nativeCustom {
  dreamBig: () => NativeProperty<string>;
  openNativeModalView: () => void;
}

```

The 2 examples provided, `dreamBig` and `openNativeModalView`, can be found in the `nativeCustom` interface to give you guidance on how to add your own.
