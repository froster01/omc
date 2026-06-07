# Native Module Linking Guide

This guide provides step-by-step instructions for linking all native modules required for the Olmosq Staff Portal React Native app.

## Required Native Modules

1. **@react-native-community/blur** - Glassmorphism effects (iOS primarily)
2. **react-native-vector-icons** - Material Community Icons
3. **react-native-linear-gradient** - Background gradients
4. **react-native-svg** - SVG support (for QR codes)
5. **react-native-qrcode-svg** - QR code generation

---

## Step 1: React Native Vector Icons

### Android Configuration

**1. Edit `android/app/build.gradle`:**

Add this line at the end of the file:

```gradle
apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")
```

**Complete file should look like:**

```gradle
apply plugin: "com.android.application"
apply plugin: "org.jetbrains.kotlin.android"
apply plugin: "com.facebook.react"

// ... rest of configuration ...

apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")
```

This will automatically copy icon fonts to your Android project.

---

## Step 2: React Native Blur (iOS primarily)

### Android Configuration

The blur library has limited Android support. We've implemented a fallback, but you can still link it:

**1. Already auto-linked via React Native 0.60+**

No manual steps needed for Android. The app uses a semi-transparent background fallback on Android.

### iOS Configuration (if needed later)

```bash
cd ios
pod install
cd ..
```

---

## Step 3: React Native Linear Gradient

### Android Configuration

**1. Already auto-linked via React Native 0.60+**

Verify in `android/settings.gradle`:

```gradle
include ':react-native-linear-gradient'
project(':react-native-linear-gradient').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-linear-gradient/android')
```

**2. Verify in `android/app/build.gradle`:**

Should be auto-included in dependencies:

```gradle
dependencies {
    implementation project(':react-native-linear-gradient')
    // ... other dependencies
}
```

---

## Step 4: React Native SVG

### Android Configuration

**1. Already auto-linked via React Native 0.60+**

No manual steps needed.

---

## Step 5: Clean Build

After linking all modules, perform a clean build:

```bash
cd /home/ferostzz/Desktop/project/omc

# Clean Android build
cd android
./gradlew clean
cd ..

# Rebuild and run
npm run android
```

---

## Verification Steps

### 1. Check Icon Fonts

After building, verify icon fonts are copied:

```bash
ls -la android/app/src/main/assets/fonts/
```

You should see:
- MaterialCommunityIcons.ttf
- (other icon fonts)

### 2. Test Each Module

**Vector Icons:**
```tsx
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
<Icon name="coffee" size={24} color="#A7C472" />
```

**Linear Gradient:**
```tsx
import LinearGradient from 'react-native-linear-gradient';
<LinearGradient colors={['#F5F9F0', '#E8F0E0']} />
```

**QR Code:**
```tsx
import QRCode from 'react-native-qrcode-svg';
<QRCode value="https://olmosq.menu/t1" size={120} />
```

**Blur (iOS):**
```tsx
import { BlurView } from '@react-native-community/blur';
<BlurView blurType="light" blurAmount={10} />
```

---

## Common Issues & Solutions

### Issue 1: Icons Not Showing

**Symptom:** Icon components render but show empty boxes

**Solution:**
```bash
cd android
./gradlew clean
cd ..
rm -rf android/app/build
npm run android
```

### Issue 2: Gradle Build Fails

**Symptom:** Build fails with "Could not resolve..."

**Solution:**
```bash
cd android
./gradlew clean --refresh-dependencies
./gradlew assembleDebug
```

### Issue 3: Linear Gradient Not Working

**Symptom:** Gradient backgrounds not rendering

**Solution:**
Check that you're importing correctly:
```tsx
import LinearGradient from 'react-native-linear-gradient';
// NOT: import { LinearGradient } from ...
```

### Issue 4: QR Code Not Rendering

**Symptom:** QR codes show blank or error

**Solution:**
Ensure react-native-svg is properly linked:
```bash
cd android
./gradlew clean
cd ..
npm run android
```

---

## Android Build Configuration Reference

### `android/app/build.gradle` (Complete)

```gradle
apply plugin: "com.android.application"
apply plugin: "org.jetbrains.kotlin.android"
apply plugin: "com.facebook.react"

react {
    /* ... configuration ... */
}

android {
    namespace "com.omc"
    compileSdk rootProject.ext.compileSdkVersion

    defaultConfig {
        applicationId "com.omc"
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 1
        versionName "1.0"
    }
    
    signingConfigs {
        debug {
            storeFile file('debug.keystore')
            storePassword 'android'
            keyAlias 'androiddebugkey'
            keyPassword 'android'
        }
    }
    
    buildTypes {
        debug {
            signingConfig signingConfigs.debug
        }
        release {
            signingConfig signingConfigs.debug
            minifyEnabled false
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
        }
    }
}

dependencies {
    implementation("com.facebook.react:react-android")
    
    // Auto-linked native modules
    implementation project(':@react-native-community_blur')
    implementation project(':react-native-linear-gradient')
    implementation project(':react-native-svg')
    implementation project(':react-native-qrcode-svg')
    implementation project(':react-native-vector-icons')
}

// IMPORTANT: Add this at the end
apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")
```

---

## Build Commands Reference

### Development Build
```bash
npm run android
```

### Clean Build
```bash
cd android
./gradlew clean
cd ..
npm run android
```

### Debug APK
```bash
cd android
./gradlew assembleDebug
```

APK location: `android/app/build/outputs/apk/debug/app-debug.apk`

### Install APK on Device
```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### Check Connected Devices
```bash
adb devices
```

---

## Testing Checklist

After linking and building, test these features:

- [ ] **LoginScreen**
  - [ ] Gradient background renders
  - [ ] Icons show (person, lock, fingerprint)
  - [ ] Glassmorphic card (may show fallback on Android)
  
- [ ] **DashboardScreen**
  - [ ] Navigation rail icons render
  - [ ] All metric card icons show
  - [ ] Quick action icons render
  
- [ ] **OrderDetailScreen**
  - [ ] Status timeline icons render
  - [ ] Item icons show
  - [ ] Action button icons display
  
- [ ] **PaymentScreen**
  - [ ] Payment method icons render
  - [ ] Calculator functions work
  - [ ] Icons in buttons show
  
- [ ] **TablesScreen**
  - [ ] QR codes generate and display
  - [ ] Navigation icons render
  - [ ] All action icons show

---

## Performance Notes

### Icon Fonts
- Icon fonts are ~500KB total
- Loaded once on app start
- No performance impact after initial load

### QR Code Generation
- Generated on-demand
- ~10ms per QR code
- Use memoization for performance:
  ```tsx
  const qrCode = React.useMemo(
    () => <QRCode value={url} size={120} />,
    [url]
  );
  ```

### Linear Gradient
- Hardware accelerated on Android
- Minimal performance impact
- Avoid animating gradient colors

---

## Next Steps

1. **Link all modules** following steps above
2. **Clean build** the Android app
3. **Run on emulator** or device
4. **Test each screen** using the checklist
5. **Report any issues** with specific error messages

---

## Support Resources

- **React Native Vector Icons:** https://github.com/oblador/react-native-vector-icons
- **React Native Blur:** https://github.com/Kureev/react-native-blur
- **React Native Linear Gradient:** https://github.com/react-native-linear-gradient/react-native-linear-gradient
- **React Native QR Code:** https://github.com/awesomejerry/react-native-qrcode-svg

---

**Last Updated:** June 7, 2026  
**Project:** Olmosq Staff Portal  
**React Native Version:** 0.85.3
