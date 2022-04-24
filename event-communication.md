# Notify and listen to events

When needing to communicate events back and forth between Ionic/Capacitor and your NativeScript utilities you can use:

* `notifyEvent: (name: string, data?: any) => void`: Notify event name with optional data.
* `onEvent: (name: string, callback: Function) => void`: Listen to event name with callback.
* `removeEvent: (name: string, callback?: Function) => void`: Remove event listeners.

For example using the [zip example](solution-145) you can use `notifyEvent` in your NativeScript utilities to emit events:

- `src/nativescript/zip.ts`

```ts
// ...
import { notifyEvent } from "@nativescript/capacitor/bridge";

native.fileZip = function (options: ZipOptions) {
    // ...

    Zip.zip({
      directory,
      archive,
      onProgress: (progress) => {
        notifyEvent('zipProgress', progress);
      },
    }).then((filePath) => {
      notifyEvent('zipComplete', filePath);
    });
  }
};
```

You can then listen to those events in your Ionic components:

- `src/app/explore-container.component.ts`:

```ts
import { native } from '@nativescript/capacitor'

// ...
export class ExploreContainerComponent implements OnInit {
  ngOnInit() {
    native.onEvent('zipComplete', (filepath) => {
      console.log('ionic zip complete:', filepath)
    })
    native.onEvent('zipProgress', (progress) => {
      console.log('ionic zip progress:', progress)
    })
  }
}
```
