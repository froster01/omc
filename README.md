# Olmosq Staff - React Native App

React Native tablet application for Olmosq QR ordering system staff operations.

## Documentation

- **[Quick Start Guide](docs/QUICK_START.md)** - Get up and running in 5 minutes
- **[Implementation Overview](docs/IMPLEMENTATION.md)** - What was built and project stats
- **[Backend API Guide](docs/BACKEND_GUIDE.md)** - How to implement REST API endpoints
- **[Development Guide](docs/DEVELOPMENT.md)** - Development workflow, patterns, and best practices

## Project Structure

```
omc/
├── src/
│   ├── api/              # API client and endpoints
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── navigation/       # Navigation configuration
│   ├── screens/          # Screen components
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
├── android/              # Android native code
├── ios/                  # iOS native code (future)
└── App.tsx               # App entry point
```

## Prerequisites

- Node.js >= 22.11.0
- npm or yarn
- Android Studio (for Android development)
- JDK 17
- Android SDK
- A running backend API (from olmosq-qr project)

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Install Android dependencies:**
   ```bash
   cd android
   ./gradlew clean
   cd ..
   ```

3. **Configure API endpoint:**
   
   Edit `src/utils/constants.ts` and update the `API_CONFIG.BASE_URL`:
   
   - For Android Emulator: `http://10.0.2.2:3000/api`
   - For physical device: `http://YOUR_COMPUTER_IP:3000/api` (e.g., `http://192.168.1.100:3000/api`)

## Running the App

### Development

1. **Start Metro bundler:**
   ```bash
   npm start
   ```

2. **Run on Android:**
   ```bash
   npm run android
   ```

   Or for a specific device:
   ```bash
   npx react-native run-android --deviceId=<device-id>
   ```

### Production Build

1. **Generate release APK:**
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

2. **APK location:**
   ```
   android/app/build/outputs/apk/release/app-release.apk
   ```

## Backend API Setup

This app requires a Node.js backend API. You need to:

1. **Extend the olmosq-qr backend** with Express routes (see migration guide)
2. **Or create a standalone API** that implements the required endpoints

### Required API Endpoints

#### Authentication
- `POST /api/auth/login` - Staff login
- `POST /api/auth/logout` - Staff logout
- `GET /api/auth/me` - Get current user

#### Orders
- `GET /api/orders` - List orders
- `GET /api/orders/:id` - Get order detail
- `PATCH /api/orders/:id/status` - Update order status
- `POST /api/orders/:id/payment` - Record payment

#### Shifts
- `GET /api/shifts/current` - Get current shift
- `POST /api/shifts/open` - Open shift
- `POST /api/shifts/close` - Close shift
- `POST /api/shifts/cash-movements` - Create cash movement
- `GET /api/shifts/history` - Get shift history

#### Loyverse
- `POST /api/loyverse/sync-menu` - Sync menu
- `POST /api/loyverse/sync-payments` - Sync payment types

#### Other
- `GET /api/payment-types` - Get payment types
- `GET /api/tables` - Get tables
- `GET /api/categories` - Get categories

### WebSocket

- Path: `/ws/orders`
- Query params: `?token=<jwt>&staff=true`
- Events: `order.created`, `order.updated`

## Features

### Implemented
- ✅ Staff authentication (JWT Bearer token)
- ✅ Dashboard with shift info and stats
- ✅ Real-time order list with WebSocket
- ✅ Order detail view
- ✅ Order status management (Accept, Preparing, Done)
- ✅ Payment recording with multiple payment types
- ✅ Cash calculation and change
- ✅ Shift management (Open/Close)
- ✅ Shift reports and history
- ✅ Menu sync from Loyverse
- ✅ Landscape tablet orientation
- ✅ Offline-first architecture ready

### Placeholders (Coming Soon)
- ⏳ Cash drawer management
- ⏳ Table QR code viewing
- ⏳ Menu settings
- ⏳ Push notifications

## Configuration

### API Configuration

Edit `src/utils/constants.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL: 'http://10.0.2.2:3000/api', // Update this
  TIMEOUT: 10000,
  WS_URL: 'ws://10.0.2.2:3000', // Update this
};
```

### Android Landscape Mode

Already configured in `AndroidManifest.xml`:
```xml
android:screenOrientation="landscape"
```

### Network Security (Development)

Configured in `android/app/src/main/res/xml/network_security_config.xml` to allow cleartext traffic for localhost/emulator.

## Development Tips

### Find your computer's IP address

**On Ubuntu/Linux:**
```bash
ip addr show | grep inet
```

**On macOS:**
```bash
ifconfig | grep inet
```

**On Windows:**
```bash
ipconfig
```

Look for your local IP (usually starts with `192.168.x.x` or `10.0.x.x`)

### Connect physical Android tablet

1. Enable Developer Options on tablet
2. Enable USB Debugging
3. Connect via USB
4. Run: `adb devices` to verify connection
5. Update API URL in `constants.ts` to your computer's IP
6. Run: `npm run android`

### Clear cache

```bash
npx react-native start --reset-cache
```

### Debugging

1. **React Native Debugger:**
   - Shake device → "Debug"
   - Or: `adb shell input keyevent 82`

2. **Chrome DevTools:**
   - Open: `chrome://inspect`

3. **View logs:**
   ```bash
   npx react-native log-android
   ```

## Troubleshooting

### Cannot connect to API

- Check API is running on backend server
- Verify IP address in `constants.ts`
- Check firewall allows connections
- For emulator, use `10.0.2.2` not `localhost`

### Build errors

```bash
cd android
./gradlew clean
cd ..
npx react-native start --reset-cache
```

### Metro bundler issues

```bash
watchman watch-del-all
rm -rf node_modules
npm install
npx react-native start --reset-cache
```

## Tech Stack

- **React Native** 0.85.3
- **React** 19.2.3
- **TypeScript** 5.x
- **React Navigation** - Navigation
- **React Query** - Data fetching and caching
- **Zustand** - State management
- **Axios** - HTTP client
- **Socket.io** - WebSocket (real-time)
- **React Native Keychain** - Secure storage

## Next Steps

1. **Backend Implementation:**
   - Add Express routes to olmosq-qr backend
   - Implement JWT Bearer token authentication
   - Update WebSocket to accept token query param

2. **Testing:**
   - Test on physical tablet
   - Test with real backend API
   - Test real-time updates
   - Test payment flow end-to-end

3. **Production:**
   - Update API URLs for production
   - Generate signed APK
   - Set up CI/CD pipeline
   - Deploy to Play Store (optional)

## License

Private - Olmosq Project

## Documentation

For detailed guides, see the [docs/](docs/) directory:
- [Quick Start](docs/QUICK_START.md) - 5-minute setup
- [Implementation](docs/IMPLEMENTATION.md) - What was built
- [Backend Guide](docs/BACKEND_GUIDE.md) - API implementation
- [Development](docs/DEVELOPMENT.md) - Development workflow

## Support

For issues or questions, contact the development team.
