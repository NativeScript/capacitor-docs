## Explaining the examples

The installation includes 1 simple example to give you ideas of possibilities.

### `examples/modal.ts`

An example showing how to do some native ui blending to open a purely native platform modal. This is exactly what `nscap init` scaffolds:

```typescript
import { iosRootViewController } from '@nativescript/capacitor/bridge';

native.openNativeModalView = () => {
  if (native.isAndroid) {
    console.log('openNativeModalView: Android lands in a later 8.x release');
    return;
  }
  const vc = UIViewController.alloc().init();
  vc.view.backgroundColor = UIColor.systemIndigoColor;
  const label = UILabel.alloc().initWithFrame(
    CGRectMake(0, 80, UIScreen.mainScreen.bounds.size.width, 50),
  );
  label.text = 'Hello from NativeScript 🚀';
  label.textColor = UIColor.whiteColor;
  label.textAlignment = NSTextAlignment.Center;
  label.font = UIFont.boldSystemFontOfSize(28);
  vc.view.addSubview(label);
  iosRootViewController().presentViewControllerAnimatedCompletion(vc, true, () => {
    console.log('modal presented');
  });
};
```

Everything in the iOS branch is a direct platform API call — `UIViewController`, `UILabel`, `CGRectMake` — exactly as you'd find them in the [Apple Developer Docs](https://developer.apple.com/documentation/uikit). The completion callback demonstrates callbacks marshalling naturally across the bridge.

Usage in your web codebase:

```typescript
import { native } from '@nativescript/capacitor';

native.openNativeModalView(); // Open native modal
```

Declare it in `src/native-custom.d.ts` for full type support — see [What is native-custom.d.ts?](native-custom)
