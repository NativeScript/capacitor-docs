## Migrating from v4 to v5

@nativescript/capacitor follows Capacitor major version releases.

For existing v4 users, you can update by:

1. Update `package.json`:

```ts
"@nativescript/capacitor": "^5.0.0"
```

2. Update `ios/App/Podfile` to reference the latest `NativeScriptSDK ~8.4.2` Pod and adjust the post_install setup:

```ts
require_relative '../../node_modules/@nativescript/capacitor/ios/nativescript.rb'
require_relative '../../node_modules/@capacitor/ios/scripts/pods_helpers'

platform :ios, '13.0'
use_frameworks!

# workaround to avoid Xcode caching of Pods that requires
# Product -> Clean Build Folder after new Cordova plugins installed
# Requires CocoaPods 1.6 or newer
install! 'cocoapods', :disable_input_output_paths => true

def capacitor_pods
  pod 'Capacitor', :path => '../../node_modules/@capacitor/ios'
  pod 'CapacitorCordova', :path => '../../node_modules/@capacitor/ios'
  pod 'CapacitorApp', :path => '../../node_modules/@capacitor/app'
  pod 'CapacitorHaptics', :path => '../../node_modules/@capacitor/haptics'
  pod 'CapacitorKeyboard', :path => '../../node_modules/@capacitor/keyboard'
  pod 'CapacitorStatusBar', :path => '../../node_modules/@capacitor/status-bar'
  pod 'NativescriptCapacitor', :path => '../../node_modules/@nativescript/capacitor'
end

target 'App' do
  capacitor_pods
  # Add your Pods here

 pod 'NativeScriptSDK', '~> 8.4.2'
 pod 'NativeScriptUI'
end

post_install do |installer|
  assertDeploymentTarget(installer)

  nativescript_capacitor_post_install(installer)
end

```

3. Ensure latest pod specs are refreshed locally

You can run `pod repo update` to ensure the latest references are available on your system.

4. Clean project dependencies and ensure lock (if using) is updated to reflect latest @nativescript/capacitor 5.0.0 is installed.

5. Ensure native projects are cleaned before running with updates.
