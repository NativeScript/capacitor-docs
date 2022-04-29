---
customLayout: true
sidebar: false
---

<script setup>
import HomeComponent from './.vitepress/theme/HomeComponent.vue'
</script>


<HomeComponent>

  <template v-slot:box1>

```ts
import { Zip } from "@nativescript/zip";
import { notifyEvent } from "@nativescript/capacitor/bridge";

interface ZipOptions {
    directory: string,
    archive: string
}

native.fileZip = function (options: ZipOptions) {
  const { directory, archive } = options;
  Zip.zip({
    directory,
    archive,
    onProgress: (progress) => {
      notifyEvent('zipProgress', progress);
    },
  }).then((filePath) => {
    notifyEvent('zipComplete', filePath);
  });
};
```

  </template>

  <template v-slot:box2>

```ts
import { native } from '@nativescript/capacitor';

export class ExploreContainerComponent {
  fileZip() {
    native.onEvent('zipComplete', (filePath: string) => {
      console.log('zip created at:', filePath);
    });
      
    native.fileZip({
      directory: 'assets',
      archive: 'assets.zip'
    });
  }
}
```

  </template>

</HomeComponent>

