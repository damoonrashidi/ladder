# King of Pong

A ladder and ranking system for table tennis.

## Getting Started

First [Set up flutter](https://flutter.io/setup-macos/) on your computer.
Secondly create a virtual device through AVD in Android Studio, for instance a Google Pixel 2 XL called `pixel2XL`.

You can launch the virtual device through AVD as well, but I prefer to do it via the CLI with `~/path_to_sdk/android/emulator/emulator` aliased to `emu` in my `.zshrc`.


This will launch an android emulator with the target device
```bash
#terminal 1
emu @pixel2XL
```

And this will run the app on the virtual device 
```bash
#terminal 2
flutter run
```