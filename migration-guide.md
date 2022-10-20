## Migrating from v2 to v4

@nativescript/capacitor follows Capacitor major version releases now.

For existing v2 users, you can update by:

1. Update `package.json`:

```
"@nativescript/capacitor": "^4.0.0"
```

2. Update `AppDelegate.swift`:

From this:
```
self.nativescript?.runMainScript()
```

to this:
```
self.nativescript?.runMainApplication()
```

3. Update `ios/App/Podfile` to reference the latest `~8.3.3` Pod and adjust the post_install setup:

```
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

 pod 'NativeScript', '~> 8.3.3' 
 pod 'NativeScriptUI'
end

post_install do |installer|
  assertDeploymentTarget(installer)

  nativescript_capacitor_post_install(installer)
end

```

4. Ensure latest pod specs are refreshed locally

You can run `pod repo update` to ensure the latest references are available on your system.

5. Clean project dependencies and ensure lock (if using) is updated to reflect latest @nativescript/capacitor 4.0.0 is installed.

6. Ensure native projects are cleaned before running with updates.
