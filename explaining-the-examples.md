## Explaining the examples

The installation includes 2 simple examples to give you ideas of possibilities. 

### `examples/simple.ts`

An example showing how to return a native value from your platform.

```typescript
native.dreamBig = () => {
  const message = 'Dream big!';
  if (native.isAndroid) {
    return new java.lang.String(message);
  } else {
    return NSString.alloc().initWithString(message);
  }
};
```

Usage in your Ionic web codebase:

```typescript
import { native } from '@nativescript/capacitor';

native.dreamBig().value.then(v => {
  console.log(v); // Dream big!
});
```

### `examples/modal.ts`

An example showing how to do some native ui blending to open a purely native platform modal.

```typescript
native.openNativeModalView = () => {
  if (native.isAndroid) {
    androidCreateDialog(() => {
      const activity = native.androidCapacitorActivity;

      const layout = new android.widget.LinearLayout(activity);
      layout.setGravity(android.view.Gravity.CENTER);
      layout.setOrientation(android.widget.LinearLayout.VERTICAL);

      const btn = new android.widget.Button(activity);
      btn.setText('Ionic');
      layout.addView(btn);

      const btn1 = new android.widget.Button(activity);
      btn1.setText('Capacitor');
      layout.addView(btn1);

      return layout;
    });
  } else {
    const vc = UIViewController.alloc().init();
    vc.view.backgroundColor = UIColor.blueColor;
    const label = UILabel.alloc().initWithFrame(
      CGRectMake(0, 30, UIScreen.mainScreen.bounds.size.width, 50),
    );
    label.text = `Well this is fun.`;
    label.textColor = UIColor.orangeColor;
    label.textAlignment = NSTextAlignment.Center;
    label.font = UIFont.systemFontOfSize(35);
    vc.view.addSubview(label);
    iosRootViewController().presentModalViewControllerAnimated(vc, true);
  }
};
```

Usage in your Ionic web codebase:

```typescript
import { native } from '@nativescript/capacitor';

native.openNativeModalView(); // Open native modal
```