# custom-native-api.d.ts

When adding your own custom native helpers, you can expand this interface to provide strong type checking for all the extra utilities you add to your project.

```typescript
import type { nativeAPI, NativeProperty } from "@nativescript/capacitor/dist/esm/nativeapi";

declare module "@nativescript/capacitor"  {
  export interface customNativeAPI {
      dreamBig: () => NativeProperty<string>;
      openNativeModalView: () => void;
  }
  export const native: typeof nativeAPI & customNativeAPI;
}
```

The 2 examples provided, `dreamBig` and `openNativeModalView`, can be found in the `customNativeAPI` interface here to give your guidance on how you can add your own.
