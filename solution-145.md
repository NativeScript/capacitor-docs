# Zip

https://github.com/capacitor-community/proposals/issues/145

In 8.x this needs **no plugins, no pods, no custom metadata** — both platforms can create zip archives with nothing but their standard APIs, which are already in the default metadata:

- **iOS**: `NSFileCoordinator` with the `ForUploading` reading option hands you a zip of any folder (the same mechanism Files/Mail use for folder uploads).
- **Android**: `java.util.zip.ZipOutputStream`, straight from the JDK.

*Validated on iOS 26.5 (simulator) and Android API 35 (emulator).*

### `src/nativescript/index.ts`:

```typescript
// Zip
import "./zip";
```

### `src/nativescript/zip.ts`:

```typescript
import { notifyEvent } from "@nativescript/capacitor/bridge";
import { ZipOptions } from "../native-custom";

function zipFolderIOS(directory: string, archive: string) {
  const fileManager = NSFileManager.defaultManager;
  const coordinator = NSFileCoordinator.alloc().init();
  const errorRef = new interop.Reference();
  coordinator.coordinateReadingItemAtURLOptionsErrorByAccessor(
    NSURL.fileURLWithPath(directory),
    NSFileCoordinatorReadingOptions.ForUploading,
    errorRef,
    (zipUrl) => {
      if (fileManager.fileExistsAtPath(archive)) {
        fileManager.removeItemAtPathError(archive);
      }
      fileManager.copyItemAtPathToPathError(zipUrl.path, archive);
      notifyEvent("zipComplete", archive);
    }
  );
}

function zipFolderAndroid(directory: string, archive: string) {
  const dir = new java.io.File(directory);
  const outFile = new java.io.File(archive);
  const zos = new java.util.zip.ZipOutputStream(
    new java.io.FileOutputStream(outFile)
  );
  const files = dir.listFiles();
  for (let i = 0; i < files.length; i++) {
    zos.putNextEntry(new java.util.zip.ZipEntry(files[i].getName()));
    const fis = new java.io.FileInputStream(files[i]);
    const buffer = Array.create("byte", 4096);
    let len: number;
    while ((len = fis.read(buffer)) > 0) {
      zos.write(buffer, 0, len);
    }
    fis.close();
    zos.closeEntry();
  }
  zos.close();
  notifyEvent("zipComplete", archive);
}

native.fileZip = (options: ZipOptions) => {
  if (native.isAndroid) {
    const context = native.androidCapacitorActivity;
    const directory = new java.io.File(context.getFilesDir(), options.directory)
      .getAbsolutePath();
    const archive = new java.io.File(context.getCacheDir(), options.archive)
      .getAbsolutePath();
    zipFolderAndroid(directory, archive);
  } else {
    const documents = NSSearchPathForDirectoriesInDomains(
      NSSearchPathDirectory.DocumentDirectory,
      NSSearchPathDomainMask.UserDomainMask,
      true
    ).firstObject;
    zipFolderIOS(
      documents + "/" + options.directory,
      NSTemporaryDirectory() + options.archive
    );
  }
};
```

:::tip Unzipping?

Android can also *extract* with the same zero-dependency approach (`java.util.zip.ZipInputStream`). iOS has no public unzip API — that use case lands with NativeScript plugin support in a later 8.x release.

:::

## Usage in your Ionic web codebase:

Provide strong type checking for this new helper by modifying the following:

### `src/native-custom.d.ts`

```typescript
/**
 * Define your own strongly typed native helpers here.
 */
export interface ZipOptions {
  directory: string;
  archive: string;
}

export interface nativeCustom {
  fileZip(options: ZipOptions): void;
}
```

Now you can use it anywhere in your Ionic web codebase with the following:

```typescript
import { native } from "@nativescript/capacitor";

native.onEvent("zipComplete", (filepath) => {
  console.log("zip complete:", filepath);
});

native.fileZip({
  directory: "assets",
  archive: "assets.zip"
});
```
