# Backend Connection Fix - Summary

**Date:** June 7, 2026  
**Issue:** React Native app couldn't connect to local Node.js backend

---

## Problem Identified

**Port mismatch:**
- Backend running on: `http://localhost:3001`
- App configured for: `http://10.0.2.2:3000` ❌

---

## Solution Applied

### 1. Updated API Configuration

**File:** `src/utils/constants.ts`

**Changed:**
```typescript
BASE_URL: 'http://10.0.2.2:3001/api'  // Changed from :3000 to :3001
WS_URL: 'ws://10.0.2.2:3001'          // Changed from :3000 to :3001
```

---

## Backend Status

✅ **Backend is running correctly on port 3001**
- Health check: http://localhost:3001/health → 200 OK
- Auth endpoint: http://localhost:3001/api/auth/login → 401 (working, needs valid credentials)

✅ **Network security configured**
- Cleartext traffic allowed for 10.0.2.2 (emulator)
- CORS enabled on backend

---

## How 10.0.2.2 Works

**Android Emulator networking:**
- `10.0.2.2` is a special IP that routes to your host machine's `localhost`
- From emulator's perspective: `10.0.2.2:3001` = `localhost:3001` on your computer

**For physical device:**
Replace `10.0.2.2` with your computer's local IP:
```bash
# Find your IP
ip addr show | grep "inet 192"

# Example: 192.168.1.100
BASE_URL: 'http://192.168.1.100:3001/api'
```

---

## Next Steps

1. **Reload the app:**
   - Press `R` twice in Metro bundler, or
   - Shake device → Reload, or
   - Stop and restart: `npm run android`

2. **Test login:**
   - Open app → Login screen
   - Enter valid staff credentials
   - Should connect to backend successfully

---

## Troubleshooting

### If connection still fails:

**1. Check backend is running:**
```bash
curl http://localhost:3001/health
# Should return: {"status":"ok","timestamp":"..."}
```

**2. Check firewall:**
```bash
sudo ufw status
# If active, allow port 3001:
sudo ufw allow 3001
```

**3. Test from emulator:**
```bash
# Get shell on emulator
adb shell

# Test connection (if curl is available)
curl http://10.0.2.2:3001/health
```

**4. Check backend logs:**
```bash
cd /home/ferostzz/Desktop/project/omc-backend
# Backend should log incoming requests
```

**5. Verify Metro bundler:**
```bash
# Restart with cache clear
npx react-native start --reset-cache
```

---

## Files Modified

1. ✅ `src/utils/constants.ts` - Updated port from 3000 to 3001

---

## Backend API Endpoints

Available at `http://10.0.2.2:3001/api/`:

- **Authentication:**
  - POST `/auth/login` - Staff login
  - POST `/auth/logout` - Staff logout
  - GET `/auth/me` - Current user

- **Orders:**
  - GET `/orders` - List orders
  - GET `/orders/:id` - Order detail
  - PATCH `/orders/:id/status` - Update status
  - POST `/orders/:id/payment` - Record payment

- **Shifts:**
  - GET `/shifts/current` - Current shift
  - POST `/shifts/open` - Open shift
  - POST `/shifts/close` - Close shift
  - POST `/shifts/cash-movements` - Cash movement
  - GET `/shifts/history` - Shift history

- **Other:**
  - GET `/payment-types` - Payment types
  - GET `/tables` - Tables list
  - GET `/categories` - Menu categories

---

**Status:** ✅ Fixed - App should now connect to backend on port 3001
