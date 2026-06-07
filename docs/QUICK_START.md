# Quick Start Guide - Olmosq Staff App

## 🚀 Quick Setup (5 minutes)

### 1. Install Dependencies
```bash
cd /home/ferostzz/Desktop/project/omc
npm install
```

### 2. Configure API Endpoint

Edit `src/utils/constants.ts` line 12-15:

```typescript
BASE_URL: __DEV__
  ? 'http://10.0.2.2:3000/api'  // Android emulator
  : 'https://your-production-url.com/api',
```

**For physical tablet:** Change `10.0.2.2` to your computer's IP address.

**Find your IP:**
```bash
ip addr show | grep inet
# Look for 192.168.x.x or 10.0.x.x
```

### 3. Run the App

**Start Metro:**
```bash
npm start
```

**In another terminal, run on Android:**
```bash
npm run android
```

## 📱 First Run Checklist

- [ ] Backend API is running (`http://localhost:3000`)
- [ ] Metro bundler is running
- [ ] Android emulator or device is connected
- [ ] App installed and launched
- [ ] Login screen appears
- [ ] Can login with staff credentials

## 🔧 Backend API Requirements

You need to implement these REST endpoints in your olmosq-qr backend:

### Authentication
```
POST   /api/auth/login      - Login (returns JWT token)
GET    /api/auth/me         - Get current user
POST   /api/auth/logout     - Logout
```

### Orders
```
GET    /api/orders          - List orders
GET    /api/orders/:id      - Get order
PATCH  /api/orders/:id/status - Update status
POST   /api/orders/:id/payment - Record payment
```

### Shifts
```
GET    /api/shifts/current  - Current shift
POST   /api/shifts/open     - Open shift
POST   /api/shifts/close    - Close shift
GET    /api/shifts/history  - Shift history
```

### WebSocket
```
ws://localhost:3000/ws/orders?token=<jwt>&staff=true
```

## 🐛 Common Issues

### "Cannot connect to server"
- Check backend is running
- Verify API URL in `constants.ts`
- For physical device, use computer IP not `localhost`

### "Build failed"
```bash
cd android && ./gradlew clean && cd ..
npx react-native start --reset-cache
npm run android
```

### Metro bundler issues
```bash
watchman watch-del-all
rm -rf node_modules && npm install
npx react-native start --reset-cache
```

## 📦 Project Structure

```
omc/
├── src/
│   ├── api/                    # API clients
│   │   ├── client.ts          # Axios with auth interceptors
│   │   ├── auth.api.ts        # Authentication endpoints
│   │   ├── orders.api.ts      # Orders endpoints
│   │   ├── shifts.api.ts      # Shifts endpoints
│   │   └── ...
│   ├── components/
│   │   ├── common/            # Reusable UI (Button, Card, etc)
│   │   ├── orders/            # Order-specific components
│   │   └── shifts/            # Shift components
│   ├── hooks/
│   │   ├── useAuth.ts         # Authentication hook
│   │   ├── useOrders.ts       # Orders with React Query
│   │   ├── useShift.ts        # Shift management
│   │   └── useWebSocket.ts    # Real-time updates
│   ├── navigation/
│   │   └── AppNavigator.tsx   # Navigation setup
│   ├── screens/
│   │   ├── auth/              # Login screen
│   │   ├── dashboard/         # Dashboard
│   │   ├── orders/            # Order screens
│   │   ├── shifts/            # Shift screens
│   │   └── menu/              # Menu sync
│   ├── types/                 # TypeScript types
│   └── utils/                 # Utilities & constants
└── App.tsx                    # Entry point
```

## 🎯 Next Steps

1. **Backend:**
   - Implement REST API endpoints in olmosq-qr
   - Add JWT Bearer token authentication
   - Update WebSocket to accept token query param

2. **Testing:**
   - Test login flow
   - Test order list and real-time updates
   - Test payment recording
   - Test shift open/close

3. **Production:**
   - Update API URLs for production
   - Generate signed APK
   - Install on production tablet

## 💡 Development Tips

**View React Native logs:**
```bash
npx react-native log-android
```

**Debug menu on device:**
- Shake device or press: `adb shell input keyevent 82`

**Reload app:**
- Press `R` in Metro terminal
- Or double-tap `R` on device

**Clear everything:**
```bash
watchman watch-del-all
rm -rf node_modules
rm -rf android/build
rm -rf android/app/build
npm install
cd android && ./gradlew clean && cd ..
npx react-native start --reset-cache
```

## 📞 Need Help?

Check the main README.md for detailed documentation.
