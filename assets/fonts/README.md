# Hanken Grotesk Font Installation

## Manual Installation Required

Due to Google Fonts licensing and download restrictions, Hanken Grotesk fonts need to be manually downloaded and installed.

## Steps to Install Fonts

### 1. Download Hanken Grotesk

Visit: https://fonts.google.com/specimen/Hanken+Grotesk

Click "Download family" and extract the ZIP file.

### 2. Required Font Files

Copy these files to `assets/fonts/`:

- `HankenGrotesk-Regular.ttf` (400 weight)
- `HankenGrotesk-Medium.ttf` (500 weight)  
- `HankenGrotesk-SemiBold.ttf` (600 weight)
- `HankenGrotesk-Bold.ttf` (700 weight)

### 3. Link Fonts to React Native

```bash
cd /home/ferostzz/Desktop/project/omc
npx react-native-asset
```

This will automatically copy fonts to:
- `android/app/src/main/assets/fonts/`
- `ios/` (if iOS support added later)

### 4. Verify Installation

After linking, rebuild the app:

```bash
cd android
./gradlew clean
cd ..
npm run android
```

## Font Usage in Code

Fonts are referenced in `src/utils/designTokens.ts`:

```typescript
fontFamily: 'Hanken Grotesk'
```

## Fallback Behavior

If fonts are not installed, React Native will fall back to system default sans-serif font (Roboto on Android). The app will still function correctly, just without the exact brand typography.

## Font Weights Mapping

- Regular (400): Default body text
- Medium (500): Headlines, section headers
- SemiBold (600): Buttons, labels, emphasis
- Bold (700): Large display text (rarely used)

## Troubleshooting

### Fonts not appearing after linking

1. Clean and rebuild:
```bash
cd android
./gradlew clean
cd ..
npx react-native start --reset-cache
npm run android
```

2. Verify fonts are in `android/app/src/main/assets/fonts/`

3. Check font file names match exactly (case-sensitive)

### Alternative: Use System Fonts

If custom fonts cause issues, you can use system fonts by updating `designTokens.ts`:

```typescript
// Change from:
fontFamily: 'Hanken Grotesk'

// To:
fontFamily: 'System' // or 'Roboto' for Android
```

System fonts (Roboto) are similar to Hanken Grotesk and provide excellent readability.
