# 🚀 QUICK START GUIDE

Get the Olmosq Staff Portal React Native app running in 5 minutes.

---

## ⚡ Fast Track

```bash
cd /home/ferostzz/Desktop/project/omc

# 1. Clean build
cd android
./gradlew clean
cd ..

# 2. Run on Android
npm run android
```

That's it! The app should launch on your emulator/device.

---

## 📱 Testing the Screens

Once the app is running, navigate to these screens:

### 1. LoginScreen (Entry Point)
- **What to check:** Gradient background, glassmorphic card, icons render
- **Expected:** Sage green branding, animated logo pulse, secure footer

### 2. DashboardScreen
- **Navigate:** After login
- **What to check:** Nav rail, metric cards with side borders, quick actions grid
- **Expected:** Responsive nav (80dp/264dp), 3-column layouts, all icons visible

### 3. OrderDetailScreen
- **Navigate:** Dashboard → Orders → Select an order
- **What to check:** Display Large order number (57px), status timeline, item list
- **Expected:** Large #0042, progress line, 60/40 layout split

### 4. PaymentScreen
- **Navigate:** OrderDetail → Record Payment
- **What to check:** Calculator grid, payment methods, change calculation
- **Expected:** 3×4 calculator, working math, QR code button

### 5. TablesScreen
- **Navigate:** Dashboard → Tables
- **What to check:** QR codes generate, 4-column grid
- **Expected:** 10 table cards with actual QR codes

---

## 🔍 Visual Checklist

### Colors ✓
- [ ] Primary sage green (#A7C472) everywhere
- [ ] Soft mint background (#F5F9F3)
- [ ] Forest green accents (#739949)

### Typography ✓
- [ ] Large numbers are HUGE (48-57px)
- [ ] All text is Hanken Grotesk (or system fallback)
- [ ] Labels are uppercase and tracked

### Layout ✓
- [ ] Nav rail is 80dp or 264dp width
- [ ] Cards have 12-24dp padding
- [ ] Grids have proper gaps (16-24dp)
- [ ] Everything follows 8px grid

### Icons ✓
- [ ] All icons render (not showing boxes)
- [ ] Icons are correct colors
- [ ] Sizes are appropriate (20-36px)

### Interactions ✓
- [ ] Buttons scale down on press (0.98)
- [ ] Navigation works
- [ ] Calculator inputs numbers
- [ ] Forms accept text

---

## 🐛 Troubleshooting

### Icons Not Showing
```bash
cd android
./gradlew clean
cd ..
rm -rf android/app/build
npm run android
```

### Build Fails
```bash
cd android
./gradlew clean --refresh-dependencies
cd ..
npm run android
```

### App Crashes on Start
Check Metro bundler logs:
```bash
npm start -- --reset-cache
```

### Gradient Not Showing
Linear gradient should work. If not, check imports in LoginScreen.

### QR Codes Not Rendering
SVG library issue. Clean build and retry:
```bash
cd android && ./gradlew clean && cd .. && npm run android
```

---

## 📊 What Should Work

### ✅ Fully Functional
- Login form (UI only, auth hooks need backend)
- Navigation between screens
- All layouts render correctly
- Icons display
- Buttons respond to touch
- Calculator input works
- QR codes generate

### ⚠️ Mock Data
- Dashboard metrics (hardcoded 5, 3, 42)
- Order details (sample order #0042)
- Payment amounts (sample $24.50)
- Tables list (10 sample tables)

### ⏳ Not Yet Implemented
- Actual authentication
- Real-time order updates
- Backend API calls
- WebSocket connections
- Data persistence
- 10 remaining screens

---

## 🎯 Success Indicators

**You'll know it's working when:**

1. **App launches** without crashes
2. **Login screen shows** gradient + glass card + icons
3. **Navigation works** (can click through screens)
4. **All icons render** (no empty boxes)
5. **QR codes appear** on Tables screen
6. **Layouts match** the Stitch designs visually

---

## 📸 Visual Reference

Compare your running app to:
- `staff-login-page.png` (in project root)
- `menu-settings-page.png`
- `orders-page.png`
- `shift-page.png`
- `tables-qr-page.png`

These are screenshots from the Stitch designs for comparison.

---

## 🔧 Common First-Run Issues

### Issue: Metro bundler error
**Fix:** Reset cache
```bash
npm start -- --reset-cache
```

### Issue: "Unable to resolve module"
**Fix:** Reinstall dependencies
```bash
rm -rf node_modules
npm install
npm run android
```

### Issue: Gradle build timeout
**Fix:** Increase memory
```bash
export GRADLE_OPTS="-Xmx4096m"
cd android && ./gradlew clean && cd ..
npm run android
```

### Issue: Device not detected
**Fix:** Check ADB
```bash
adb devices
# If empty, restart adb:
adb kill-server
adb start-server
```

---

## 📋 Pre-Flight Checklist

Before running, ensure:

- [ ] Node.js installed (v22.11.0+)
- [ ] Android Studio installed
- [ ] Android SDK configured
- [ ] Emulator running OR device connected
- [ ] `npm install` completed
- [ ] No other apps using port 8081

---

## 🎬 What to Expect

### First Launch (~2-3 minutes)
1. Gradle build (60-90 seconds)
2. Metro bundler starts
3. App installs on device/emulator
4. JavaScript bundle loads
5. Login screen appears

### Subsequent Launches (~10-20 seconds)
- Much faster
- Only JS bundle reloads
- No Gradle rebuild needed

---

## 📞 Need Help?

### Check These First
1. **Metro Bundler Terminal:** Look for errors
2. **Android Logcat:** `adb logcat | grep ReactNative`
3. **Build Logs:** In Android Studio or terminal

### Documentation
- `NATIVE_MODULE_LINKING_GUIDE.md` - Detailed setup
- `FINAL_IMPLEMENTATION_REPORT.md` - What's built
- `STITCH_CONVERSION_REPORT.md` - Architecture details

---

## 🎉 Success!

If you see the login screen with:
- ✅ Gradient background
- ✅ Olmosq logo
- ✅ Glass card
- ✅ All icons
- ✅ Fingerprint prompt
- ✅ Secure footer

**You're ready to go!** 🚀

Navigate through the app and compare to the Stitch designs in `/home/ferostzz/Downloads/stitch_olmosq_app/`.

---

## 🔄 Next Steps

1. **Test all 5 screens** using the checklist above
2. **Report any issues** (specific error messages help)
3. **Implement remaining screens** (10 left)
4. **Connect to backend** when ready
5. **Deploy to production**

---

**Quick Start Complete!** Ready to test? Run: `npm run android` 🚀

