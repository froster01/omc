# Physical Tablet Connection - Setup Guide

**Your Computer IP:** `192.168.0.73`
**Backend Port:** `3001`

---

## ✅ Configuration Updated

### 1. API Configuration Changed
**File:** `src/utils/constants.ts`
```typescript
BASE_URL: 'http://192.168.0.73:3001/api'
WS_URL: 'ws://192.168.0.73:3001'
```

### 2. Network Security Already Configured
**File:** `android/app/src/main/res/xml/network_security_config.xml`
- ✅ IP `192.168.0.73` is allowed for cleartext traffic

### 3. Backend Status
✅ Accessible at: http://192.168.0.73:3001/health

---

## 📱 Tablet Setup Steps

### Step 1: Ensure Same WiFi Network
Both your computer and tablet MUST be on the same WiFi network.

**Check tablet WiFi:**
- Settings → WiFi
- Should show same network as your computer

### Step 2: Rebuild and Install App
```bash
npm run android
```

Or if the app is already running:
```bash
# Just reload in Metro bundler
# Press 'r' twice
```

### Step 3: Test Connection
1. Open app on tablet
2. Try to login
3. Check backend logs for incoming requests:
   ```bash
   cd /home/ferostzz/Desktop/project/omc-backend
   # Watch for logs showing tablet IP connecting
   ```

---

## 🔧 Troubleshooting

### If tablet still can't connect:

#### 1. Verify tablet can reach your computer
```bash
# On your computer, install simple HTTP server (if not already)
# Then from tablet browser, visit:
http://192.168.0.73:3001/health

# Should see: {"status":"ok",...}
```

#### 2. Check firewall (if you have one)
```bash
# Allow port 3001
sudo ufw allow 3001

# Or disable temporarily for testing
sudo ufw disable
```

#### 3. Check backend is bound to all interfaces
Backend should listen on `0.0.0.0:3001` not `localhost:3001`

Check backend logs when starting:
```
🚀 Server running on http://localhost:3001
```

If it says `http://127.0.0.1:3001`, update backend to bind to `0.0.0.0`

#### 4. Test from tablet browser
Before testing the app, verify network connectivity:
- Open Chrome/browser on tablet
- Visit: `http://192.168.0.73:3001/health`
- Should return JSON response

If browser can't reach it, the problem is network/firewall, not the app.

#### 5. Check backend CORS settings
Backend should allow requests from any origin during development.

In backend `src/index.ts`:
```typescript
app.use(cors({
  origin: '*', // Allow all during development
}));
```

---

## 🔄 Switching Between Emulator and Tablet

**Current config:** Physical tablet (`192.168.0.73`)

**To switch back to emulator:**
Edit `src/utils/constants.ts`:
```typescript
BASE_URL: 'http://10.0.2.2:3001/api'
```

**To support both automatically:**
You could detect emulator vs device, but simpler to just change manually when needed.

---

## 📋 Network Requirements Checklist

- [ ] Tablet and computer on same WiFi
- [ ] Backend running on port 3001
- [ ] Backend accessible: `curl http://192.168.0.73:3001/health`
- [ ] Firewall allows port 3001 (or disabled)
- [ ] App rebuilt with new IP configuration
- [ ] Network security config includes IP
- [ ] Tablet browser can reach backend

---

## 🎯 Quick Test Command

Run this from your computer to verify everything is ready:
```bash
echo "Testing backend accessibility..."
curl -s http://192.168.0.73:3001/health && echo "✅ Backend accessible via local IP" || echo "❌ Backend not accessible"
curl -s http://localhost:3001/health && echo "✅ Backend running" || echo "❌ Backend not running"
```

---

**Status:** ✅ Configuration updated for physical tablet at 192.168.0.73
**Next:** Rebuild app and test on tablet
