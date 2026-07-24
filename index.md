---
layout: page
sidebar: false
---

<script setup>
import HomeComponent from './.vitepress/theme/HomeComponent.vue'
</script>


<HomeComponent>

  <template v-slot:box1>

```ts
import { iosRootViewController } from '@nativescript/capacitor/bridge';

native.openNativeModalView = () => {
  if (native.isAndroid) {
    const builder = new android.app.AlertDialog.Builder(
      native.androidCapacitorActivity
    );
    builder.setTitle('Hello from NativeScript 🚀');
    builder.setPositiveButton('Close', null);
    builder.show();
    return;
  }
  const vc = UIViewController.alloc().init();
  vc.view.backgroundColor = UIColor.systemIndigoColor;
  iosRootViewController().presentViewControllerAnimatedCompletion(
    vc, true, () => console.log('presented!')
  );
};
```

  </template>

  <template v-slot:box2>

```ts
import { native } from '@nativescript/capacitor';

export class ExploreContainerComponent {
  async showNative() {
    // any platform API, directly from your web code
    const version = native.isAndroid
      ? await native.android.os.Build.MODEL.get
      : await native.UIDevice.currentDevice.systemVersion.get;
    console.log('running on', version);

    // or your own native helpers, written in TypeScript
    native.openNativeModalView();
  }
}
```

  </template>

</HomeComponent>

