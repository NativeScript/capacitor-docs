# Zip

https://github.com/capacitor-community/proposals/issues/145

This example uses [@nativescript/zip](https://docs.nativescript.org/plugins/zip.html)

Open `ios/App/Podfile` and let Capacitor's iOS build use `SSZipArchive` as well:

```ts
def capacitor_pods
  pod 'Capacitor', :path => '../../node_modules/@capacitor/ios'
  pod 'CapacitorCordova', :path => '../../node_modules/@capacitor/ios'
  pod 'NativescriptCapacitor', :path => '../../node_modules/@nativescript/capacitor'
end

target 'App' do
  capacitor_pods
  # Add your Pods here

  # NativeScript
  pod 'NativeScriptSDK', '~> 8.4.2'
  pod 'NativeScriptUI'

  # Zip/Unzip
  pod 'SSZipArchive', '~> 2.4.3'
end
```

### `src/nativescript/index.ts`:

```typescript
// Zip
import "./zip";
```

### `src/nativescript/zip.ts`:

```typescript
import { Zip } from "@nativescript/zip";
import { path, knownFolders } from "@nativescript/core";
import { notifyEvent } from "@nativescript/capacitor/bridge";
import { ZipOptions } from "../../native-custom";

native.fileZip = function (options: ZipOptions) {
  const directory = path.join(knownFolders.documents().path, options.directory);
  const archive = path.join(knownFolders.temp().path, options.archive);

  if (options.unzip) {
    Zip.unzip({
      directory,
      archive,
      onProgress: (progress) => {
        notifyEvent("unzipProgress", progress);
      },
    }).then((filePath) => {
      notifyEvent("unzipComplete", filePath);
    });
  } else {
    Zip.zip({
      directory,
      archive,
      onProgress: (progress) => {
        notifyEvent("zipProgress", progress);
      },
    }).then((filePath) => {
      notifyEvent("zipComplete", filePath);
    });
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
export interface ZipOptions {
  directory: string;
  archive?: string;
  unzip?: boolean;
}

export interface nativeCustom {
  fileZip(options: ZipOptions): void;
}
```

Now you can use it anywhere in your Ionic web codebase with the following:

```typescript
import { native } from "@nativescript/capacitor";

native.onEvent("zipComplete", (filepath) => {
  console.log("ionic zip complete:", filepath);
});
native.onEvent("zipProgress", (progress) => {
  console.log("ionic zip progress:", progress);
});

native.fileZip({
  directory: "assets",
  archive: "assets.zip"
});
```
