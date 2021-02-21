# Power Mode

https://github.com/capacitor-community/proposals/issues/79

### `src/nativescript/index.ts`:

```typescript
// Power Mode
import "./power-mode";
```

### `src/nativescript/power-mode.ts`:

```typescript
import {
  androidBroadcastReceiverRegister,
  androidBroadcastReceiverUnRegister,
} from "@nativescript/capacitor/bridge";

let isListening = false;
let clientCallback: (isEnabled: boolean) => void;
let observer;

native.togglePowerModeListener = (callback?: (isEnabled: boolean) => void) => {
  clientCallback = callback;
  if (native.isAndroid) {
    const action = "android.os.action.POWER_SAVE_MODE_CHANGED";
    if (!isListening) {
      isListening = true;
      androidBroadcastReceiverRegister(action, (context, intent) => {
        const manager: android.os.PowerManager = native.androidCapacitorActivity.getSystemService(
          android.content.Context.POWER_SERVICE
        );
        if (manager && clientCallback) {
          clientCallback(manager.isPowerSaveMode());
        }
      });
    } else {
      isListening = false;
      androidBroadcastReceiverUnRegister(action);
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