# Power Mode

https://github.com/capacitor-community/proposals/issues/79

### `src/nativescript/index.ts`:

```typescript
// Power Mode
import "./power-mode";
```

### `src/nativescript/power-mode.ts`:

On Android this extends `BroadcastReceiver` directly from TypeScript — in 8.x the runtime generates the binding dynamically, no build step required. *Validated on Android API 35 (emulator): toggling battery saver fires the callback.*

```typescript
let isListening = false;
let clientCallback: (isEnabled: boolean) => void;
let observer;
let receiver;

native.togglePowerModeListener = (callback?: (isEnabled: boolean) => void) => {
  clientCallback = callback;
  if (native.isAndroid) {
    const context = native.androidCapacitorActivity;
    if (!isListening) {
      isListening = true;
      const Receiver = android.content.BroadcastReceiver.extend({
        onReceive(ctx, intent) {
          const manager: android.os.PowerManager = ctx.getSystemService(
            android.content.Context.POWER_SERVICE
          );
          if (manager && clientCallback) {
            clientCallback(manager.isPowerSaveMode());
          }
        },
      });
      receiver = new Receiver();
      context.registerReceiver(
        receiver,
        new android.content.IntentFilter("android.os.action.POWER_SAVE_MODE_CHANGED")
      );
    } else {
      isListening = false;
      context.unregisterReceiver(receiver);
      receiver = null;
    }
  } else {
    if (!isListening) {
      isListening = true;
      observer = NSNotificationCenter.defaultCenter.addObserverForNameObjectQueueUsingBlock(
        NSProcessInfoPowerStateDidChangeNotification,
        null,
        null,
        (n: NSNotification) => {
          if (clientCallback) {
            clientCallback(NSProcessInfo.processInfo.lowPowerModeEnabled);
          }
        }
      );
    } else {
      isListening = false;
      NSNotificationCenter.defaultCenter.removeObserver(observer);
    }
  }
};

native.isInLowPowerMode = () => {
  if (native.isAndroid) {
    const manager: android.os.PowerManager = native.androidCapacitorActivity.getSystemService(
      android.content.Context.POWER_SERVICE
    );
    if (manager) {
      return manager.isPowerSaveMode();
    }
  } else {
    return NSProcessInfo.processInfo.lowPowerModeEnabled;
  }
  return false;
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
  togglePowerModeListener: (callback?: (isEnabled: boolean) => void) => void;
}
```

Now you can use it anywhere in your Ionic web codebase with the following:

```typescript
import { native } from '@nativescript/capacitor';

native.togglePowerModeListener((isEnabled: boolean) => {
  console.log("Power Mode changed:", isEnabled);
});
```