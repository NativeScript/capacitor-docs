# Power Mode

https://github.com/capacitor-community/proposals/issues/79

- `src/nativescript/index.ts`:

```
// Power Mode
import './power-mode';
```

- `src/nativescript/power-mode.ts`:

```
let isListening = false;
let listener;
let listenerCallback;
const action = "android.os.action.POWER_SAVE_MODE_CHANGED";

native.togglePowerModeListener = (
	callback?: (isEnabled: boolean) => void
) => {
	listenerCallback = callback;
	if (native.android) {
		if (!isListening) {
			native.androidCapacitorActivity.registerBroadcastReceiver(
				action,
				(context, intent) => {
					const manager: android.os.PowerManager =
						native.androidCapacitorActivity
						  .getSystemService(android.content.Context.POWER_SERVICE);
					if (manager && listenerCallback) {
						listenerCallback(manager.isPowerSaveMode());
					}
				}
			);
			isListening = true;
		} else {
			native.androidCapacitorActivity.unregisterBroadcastReceiver(action);
      isListening = false;
		}
	} else {
		if (!isListening) {
			listener = NSNotificationCenter.defaultCenter.addObserverForNameObjectQueueUsingBlock(
				NSProcessInfoPowerStateDidChangeNotification,
				null,
				null,
				(notif) => {
					if (listenerCallback) {
						listenerCallback(NSProcessInfo.processInfo.lowPowerModeEnabled);
					}
				}
			);
			isListening = true;
		} else {
			NSNotificationCenter.defaultCenter.removeObserver(listener);
			isListening = false;
		}
	}
};

native.isInLowPowerMode = () => {
	if (native.android) {
		const manager: android.os.PowerManager =
			native.androidCapacitorActivity
			  .getSystemService(android.content.Context.POWER_SERVICE);
		if (manager) {
			return manager.isPowerSaveMode();
		}
	} else {
		return NSProcessInfo.processInfo.lowPowerModeEnabled;
	}
	return false;
};

```
