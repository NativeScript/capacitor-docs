# @nativescript/capacitor/bridge

The bridge is fundamental to NativeScript for Capacitor and also exposes a few utility methods for quick usage.

## iosRootViewController

The root view controller of your Capacitor app (or topmost presenting controller if using in context of an existing modal).

- `iosRootViewController()`

A helper that you, yourself, could write inside `src/nativescript` on your own. We provide it as a convenience because it is so handy and often used.

#### Example usage:

```typescript
import { iosRootViewController } from "@nativescript/capacitor/bridge";

const vc = UIViewController.alloc().init();
vc.view.backgroundColor = UIColor.blueColor;
iosRootViewController().presentModalViewControllerAnimated(vc, true);
```

The source of the helper:

```typescript
export const iosRootViewController = () => {
  if (native.isAndroid) {
    console.log("iosRootViewController is iOS only.");
  } else {
    const app = UIApplication.sharedApplication;
    const win =
      app.keyWindow ||
      (app.windows && app.windows.count > 0 && app.windows.objectAtIndex(0));
    let vc = win.rootViewController;
    while (vc && vc.presentedViewController) {
      vc = vc.presentedViewController;
    }
    return vc;
  }
};
```

## androidCreateDialog

Create Android fragment dialogs on the fly.

- `androidCreateDialog(view: () => android.view.View, id?: string)`

This method is another one that you, yourself, could write inside `src/nativescript`. It's another handy and convenient utility which can be used often for various native ui blending.

#### Example usage:

```typescript
androidCreateDialog(() => {
  const activity = (<any>global).androidCapacitorActivity;

  const layout = new android.widget.LinearLayout(activity);
  layout.setGravity(android.view.Gravity.CENTER);
  layout.setOrientation(android.widget.LinearLayout.VERTICAL);

  const btn = new android.widget.Button(activity);
  btn.setText("Ionic");
  layout.addView(btn);

  return layout;
});
```

The source of the helper:

```typescript
let DialogImpl;
let DialogFragmentImpl;
if (native.isAndroid) {
  @NativeClass()
  class DialogImplClass extends android.app.Dialog {
    constructor(fragment, context, themeResId) {
      super(context, themeResId);
      return global.__native(this);
    }
  }

  DialogImpl = DialogImplClass;

  @NativeClass()
  class DialogFragmentImplClass extends androidx.fragment.app.DialogFragment {
    view: () => android.view.View;
    id: string;
    constructor(view: () => android.view.View, id?: string) {
      super();
      this.view = view;
      this.id = id;
      return global.__native(this);
    }
    onCreateDialog(savedInstanceState) {
      super.onCreateDialog(savedInstanceState);
      const activity = (<any>global).androidCapacitorActivity;

      const theme = this.getTheme();
      // In fullscreen mode, get the application's theme.
      // theme = activity.getApplicationInfo().theme;
      const dialog = new DialogImpl(this, activity, theme);
      dialog.setCanceledOnTouchOutside(true);
      return dialog;
    }
    onCreateView(inflater: any, container: any, savedInstanceState: any) {
      return this.view();
    }
  }
  DialogFragmentImpl = DialogFragmentImplClass;
}

export const androidCreateDialog = (
  view: () => android.view.View,
  id?: string
) => {
  const df = new DialogFragmentImpl(view, id);
  const fragmentManager = (<any>(
    global
  )).androidCapacitorActivity.getSupportFragmentManager();
  df.show(fragmentManager, id || uniqueId());
};

// general internal utility
const uniqueId = () => {
  return "_" + Math.random().toString(36).substr(2, 9);
};
```

## androidBroadcastReceiverRegister

Register an Android BroadcastReceiver.

- `androidBroadcastReceiverRegister(intentFilter: string, onReceiveCallback: (context: android.content.Context, intent: android.content.Intent) => void): void`

Learn more [in Android developer docs](https://developer.android.com/guide/components/broadcasts) as well as [the BroadcastReceiver api docs](https://developer.android.com/reference/android/content/BroadcastReceiver).

#### Example usage:

```typescript
const intentFilter = "android.os.action.POWER_SAVE_MODE_CHANGED";
androidBroadcastReceiverRegister(intentFilter, (context, intent) => {
  const manager: android.os.PowerManager = native.androidCapacitorActivity.getSystemService(
    android.content.Context.POWER_SERVICE
  );
  console.log(
    `Power Save Mode is ${manager.isPowerSaveMode() ? "enabled" : "disabled"}`
  );
});
```

## androidBroadcastReceiverUnRegister

Stop receiving broadcasts for the provided intent filter.

- `androidBroadcastReceiverUnRegister(intentFilter: string): void`

#### Example usage:

```typescript
const intentFilter = "android.os.action.POWER_SAVE_MODE_CHANGED";
androidBroadcastReceiverUnRegister(intentFilter);
```

Both BroadcastReceiver utilities are also things you could write yourself but we provide as a convenience.

The source of these helpers:

```typescript
let androidBroadcastReceiverClass;
let androidRegisteredReceivers: {
  [key: string]: android.content.BroadcastReceiver;
};

function ensureBroadCastReceiverClass() {
  if (androidBroadcastReceiverClass) {
    return;
  }

  @NativeClass
  class BroadcastReceiver extends android.content.BroadcastReceiver {
    private _onReceiveCallback: (
      context: android.content.Context,
      intent: android.content.Intent
    ) => void;

    constructor(
      onReceiveCallback: (
        context: android.content.Context,
        intent: android.content.Intent
      ) => void
    ) {
      super();
      this._onReceiveCallback = onReceiveCallback;

      return global.__native(this);
    }

    public onReceive(
      context: android.content.Context,
      intent: android.content.Intent
    ) {
      if (this._onReceiveCallback) {
        this._onReceiveCallback(context, intent);
      }
    }
  }

  androidBroadcastReceiverClass = BroadcastReceiver;
}

export const androidBroadcastReceiverRegister = (
  intentFilter: string,
  onReceiveCallback: (
    context: android.content.Context,
    intent: android.content.Intent
  ) => void
): void => {
  ensureBroadCastReceiverClass();
  const registerFunc = (context: android.content.Context) => {
    const receiver: android.content.BroadcastReceiver = new androidBroadcastReceiverClass(
      onReceiveCallback
    );
    context.registerReceiver(
      receiver,
      new android.content.IntentFilter(intentFilter)
    );
    if (!androidRegisteredReceivers) {
      androidRegisteredReceivers = {};
    }
    androidRegisteredReceivers[intentFilter] = receiver;
  };

  if (global.androidCapacitorActivity) {
    registerFunc(global.androidCapacitorActivity);
  }
};

export const androidBroadcastReceiverUnRegister = (
  intentFilter: string
): void => {
  if (!androidRegisteredReceivers) {
    androidRegisteredReceivers = {};
  }
  const receiver = androidRegisteredReceivers[intentFilter];
  if (receiver) {
    global.androidCapacitorActivity.unregisterReceiver(receiver);
    androidRegisteredReceivers[intentFilter] = undefined;
    delete androidRegisteredReceivers[intentFilter];
  }
};
```
