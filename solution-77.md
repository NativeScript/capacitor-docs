# Screen Brightness

https://github.com/capacitor-community/proposals/issues/77

### `src/nativescript/index.ts`:

```typescript
// Screen Brightness
import "./brightness";
```

### `src/nativescript/brightness.ts`:

```typescript
native.setScreenBrightness = (value: number) => {
  if (native.isAndroid) {
    const context = native.androidCapacitorActivity;
    if (android.os.Build.VERSION.SDK_INT < 23) {
      const attr = context.getWindow().getAttributes();
      attr.screenBrightness = value;
      context.getWindow().setAttributes(attr);
    } else {
      if (!android.provider.Settings.System.canWrite(context)) {
        const intent = new android.content.Intent(
          android.provider.Settings.ACTION_MANAGE_WRITE_SETTINGS
        );
        intent.setData(
          android.net.Uri.parse("package:" + context.getPackageName())
        );
        intent.addFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intent);
      }

      if (android.provider.Settings.System.canWrite(context)) {
        android.provider.Settings.System.putInt(
          context.getContentResolver(),
          android.provider.Settings.System.SCREEN_BRIGHTNESS,
          value * 100
        );
      }
    }
  } else {
    UIScreen.mainScreen.brightness = value;
  }
};
```

## Usage in your Ionic web codebase:

Provide strong type checking for this new helper by modifying the following:

### `src/native-custom.d.ts`

```typescript
/**
 * Define your own strongly typed native helpers here.
 */
export interface nativeCustom {
  setScreenBrightness: (value: number) => void;
}
```

Now you can use it anywhere in your Ionic web codebase with the following:

```typescript
import { native } from '@nativescript/capacitor';

native.setScreenBrightness(.8);
```
