# Development Guide - Olmosq Staff App

## Development Workflow

### Running the Development Environment

**Start Metro bundler:**
```bash
cd /home/ferostzz/Desktop/project/omc
npm start
```

**Run on Android (in another terminal):**
```bash
npm run android
```

**Run on specific device:**
```bash
npx react-native run-android --deviceId=<device-id>
```

**List connected devices:**
```bash
adb devices
```

### Hot Reload and Fast Refresh

- **Fast Refresh:** Edit any component and see changes instantly
- **Full Reload:** Press `R` in Metro terminal or double-tap `R` on device
- **Dev Menu:** Shake device or run `adb shell input keyevent 82`
- **Reset Cache:** `npx react-native start --reset-cache`

### Environment Configuration

Edit `src/utils/constants.ts` to configure:

```typescript
export const API_CONFIG = {
  BASE_URL: __DEV__
    ? 'http://10.0.2.2:3000/api'  // Android emulator
    : 'https://your-production-url.com/api',
  TIMEOUT: 10000,
  WS_URL: __DEV__
    ? 'ws://10.0.2.2:3000'
    : 'wss://your-production-url.com',
};
```

**For physical device:** Replace `10.0.2.2` with your computer's IP address.

---

## Project Structure Deep Dive

### API Layer (`src/api/`)

**Structure:**
```
src/api/
├── client.ts           # Axios instance with interceptors
├── auth.api.ts         # Authentication endpoints
├── orders.api.ts       # Order management
├── shifts.api.ts       # Shift management
├── loyverse.api.ts     # Loyverse sync
├── payments.api.ts     # Payment types
├── categories.api.ts   # Menu categories
└── tables.api.ts       # Table management
```

**Pattern:**
- Each API module exports functions that call endpoints
- All requests use the shared Axios client from `client.ts`
- Auth interceptor automatically adds JWT token
- 401 responses trigger automatic logout

### Component Structure (`src/components/`)

```
src/components/
├── common/             # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── LoadingSpinner.tsx
│   ├── EmptyState.tsx
│   └── StatusBadge.tsx
├── orders/             # Order-specific components
│   ├── OrderCard.tsx
│   └── OrdersList.tsx
└── shifts/             # Shift-specific components
    ├── ShiftControl.tsx
    └── CashMovementForm.tsx
```

**Guidelines:**
- Common components are pure and reusable
- Feature-specific components live in their own folders
- Components should be TypeScript and fully typed

### Hook Patterns (`src/hooks/`)

**Custom Hooks:**
```
src/hooks/
├── useAuth.ts          # Authentication state (Zustand)
├── useOrders.ts        # Orders data (React Query)
├── useShift.ts         # Shift management (React Query)
├── usePaymentTypes.ts  # Payment types (React Query)
└── useWebSocket.ts     # Real-time updates (Socket.io)
```

**State Management Rules:**
- **Zustand:** Client-side state (auth, UI state)
- **React Query:** Server state (API data, caching, refetching)
- **Local useState:** Component-specific UI state

### Navigation Setup (`src/navigation/`)

Navigation uses React Navigation v7 with native stack:

```typescript
// Two main stacks
AuthStack: Login
MainStack: Dashboard, Orders, Shifts, etc.

// Navigation is handled in AppNavigator.tsx
// Auth check determines which stack to show
```

---

## Adding New Features

### Adding a New Screen

**1. Create the screen file:**
```typescript
// src/screens/newfeature/NewFeatureScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const NewFeatureScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Feature</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
```

**2. Add to navigation types:**
```typescript
// src/types/navigation.types.ts
export type MainStackParamList = {
  Dashboard: undefined;
  NewFeature: undefined; // Add this
  // ... other screens
};
```

**3. Add to navigation stack:**
```typescript
// src/navigation/AppNavigator.tsx
<Stack.Screen 
  name="NewFeature" 
  component={NewFeatureScreen}
  options={{ title: 'New Feature' }}
/>
```

**4. Navigate to it:**
```typescript
navigation.navigate('NewFeature');
```

### Adding a New API Endpoint

**1. Add method to API client:**
```typescript
// src/api/newfeature.api.ts
import { apiClient } from './client';
import { NewFeatureResponse, NewFeatureRequest } from '@/types/api.types';

export const newFeatureApi = {
  getAll: async (): Promise<NewFeatureResponse[]> => {
    const response = await apiClient.get<NewFeatureResponse[]>('/newfeature');
    return response.data;
  },
  
  create: async (data: NewFeatureRequest): Promise<NewFeatureResponse> => {
    const response = await apiClient.post<NewFeatureResponse>('/newfeature', data);
    return response.data;
  },
};
```

**2. Create request/response types:**
```typescript
// src/types/api.types.ts
export interface NewFeatureResponse {
  id: string;
  name: string;
  createdAt: string;
}

export interface NewFeatureRequest {
  name: string;
}
```

**3. Create React Query hook:**
```typescript
// src/hooks/useNewFeature.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { newFeatureApi } from '@/api/newfeature.api';

export const useNewFeature = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['newfeature'],
    queryFn: newFeatureApi.getAll,
  });

  const createMutation = useMutation({
    mutationFn: newFeatureApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['newfeature'] });
    },
  });

  return {
    data,
    isLoading,
    error,
    create: createMutation.mutate,
  };
};
```

**4. Use in component:**
```typescript
import { useNewFeature } from '@/hooks/useNewFeature';

const MyComponent = () => {
  const { data, isLoading, create } = useNewFeature();
  
  // Use data and create function
};
```

### Adding a New Component

**1. Create component file:**
```typescript
// src/components/common/NewComponent.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface NewComponentProps {
  title: string;
  onPress: () => void;
}

export const NewComponent: React.FC<NewComponentProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
});
```

**2. Export from index (optional):**
```typescript
// src/components/common/index.ts
export { NewComponent } from './NewComponent';
```

**3. Use in screens:**
```typescript
import { NewComponent } from '@/components/common/NewComponent';

<NewComponent title="Hello" onPress={handlePress} />
```

---

## Code Style & Conventions

### TypeScript Patterns

- Always define prop interfaces
- Use explicit return types for functions
- Avoid `any` type - use `unknown` if needed
- Use type inference where obvious

```typescript
// Good
interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ title, onPress, disabled = false }) => {
  // Implementation
};

// Avoid
export const Button = (props: any) => {
  // Implementation
};
```

### Naming Conventions

- **Components:** PascalCase (e.g., `OrderCard.tsx`)
- **Hooks:** camelCase with `use` prefix (e.g., `useOrders.ts`)
- **API modules:** camelCase with `.api.ts` suffix (e.g., `orders.api.ts`)
- **Types:** PascalCase (e.g., `OrderResponse`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)

### File Organization

```
Feature-based organization:
src/
├── screens/
│   └── feature/
│       ├── FeatureScreen.tsx
│       └── FeatureDetailScreen.tsx
├── components/
│   └── feature/
│       └── FeatureCard.tsx
├── hooks/
│   └── useFeature.ts
└── api/
    └── feature.api.ts
```

### Import Order

```typescript
// 1. External dependencies
import React from 'react';
import { View, Text } from 'react-native';

// 2. Internal absolute imports (aliased)
import { Button } from '@/components/common/Button';
import { useOrders } from '@/hooks/useOrders';

// 3. Relative imports
import { localHelper } from './helpers';

// 4. Types
import type { OrderResponse } from '@/types/api.types';

// 5. Styles
import { styles } from './styles';
```

---

## State Management

### When to Use Zustand (Client State)

Use Zustand for:
- Authentication state (token, user)
- UI preferences (theme, language)
- App-wide client state
- State that doesn't come from server

```typescript
// src/hooks/useAuth.ts (existing example)
import create from 'zustand';

interface AuthState {
  token: string | null;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  token: null,
  user: null,
  login: (token, user) => set({ token, user }),
  logout: () => set({ token: null, user: null }),
}));
```

### When to Use React Query (Server State)

Use React Query for:
- API data fetching
- Caching server data
- Background refetching
- Optimistic updates
- Pagination

```typescript
// src/hooks/useOrders.ts (existing example)
import { useQuery } from '@tanstack/react-query';
import { ordersApi } from '@/api/orders.api';

export const useOrders = (status?: OrderStatus) => {
  return useQuery({
    queryKey: ['orders', status],
    queryFn: () => ordersApi.getOrders(status),
    refetchInterval: 5000, // Poll every 5 seconds
  });
};
```

### Local Component State

Use `useState` for:
- Form input values
- Modal open/close state
- Local UI toggles
- Component-specific state

```typescript
const [isOpen, setIsOpen] = useState(false);
const [inputValue, setInputValue] = useState('');
```

---

## Testing Strategy

### Unit Testing Components

```typescript
// src/components/common/__tests__/Button.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../Button';

describe('Button', () => {
  it('renders with title', () => {
    const { getByText } = render(<Button title="Click Me" onPress={() => {}} />);
    expect(getByText('Click Me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button title="Click" onPress={onPress} />);
    fireEvent.press(getByText('Click'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
```

### Testing API Calls

```typescript
// src/api/__tests__/orders.api.test.ts
import { ordersApi } from '../orders.api';
import { apiClient } from '../client';

jest.mock('../client');

describe('ordersApi', () => {
  it('fetches orders', async () => {
    const mockOrders = [{ id: '1', orderNumber: 1 }];
    (apiClient.get as jest.Mock).mockResolvedValue({ data: mockOrders });

    const result = await ordersApi.getOrders();
    expect(result).toEqual(mockOrders);
    expect(apiClient.get).toHaveBeenCalledWith('/orders');
  });
});
```

### Testing Hooks

```typescript
// src/hooks/__tests__/useOrders.test.ts
import { renderHook, waitFor } from '@testing-library/react-native';
import { useOrders } from '../useOrders';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useOrders', () => {
  it('fetches orders', async () => {
    const { result } = renderHook(() => useOrders(), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.data).toBeDefined();
  });
});
```

---

## Debugging

### React Native Debugger

**Open debugger:**
- Shake device or run `adb shell input keyevent 82`
- Select "Debug" from dev menu

**Features:**
- React DevTools (component tree)
- Redux DevTools (if using Redux)
- Network inspection
- Console logs

### Chrome DevTools

**Connect:**
1. Open dev menu
2. Select "Debug"
3. Navigate to `chrome://inspect` in Chrome
4. Click "inspect" on your app

### Network Inspection

**Use React Native Debugger or Flipper:**
```bash
npm install -g react-native-debugger
react-native-debugger
```

**Or add logging to Axios:**
```typescript
// src/api/client.ts
apiClient.interceptors.request.use((config) => {
  console.log('Request:', config.method?.toUpperCase(), config.url);
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    console.log('Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('Error:', error.response?.status, error.config?.url);
    return Promise.reject(error);
  }
);
```

### View Logs

**Android logs:**
```bash
npx react-native log-android
```

**Filter logs:**
```bash
adb logcat | grep "MyTag"
```

### Common Issues and Solutions

**Metro bundler won't start:**
```bash
watchman watch-del-all
rm -rf node_modules && npm install
npx react-native start --reset-cache
```

**Build errors:**
```bash
cd android && ./gradlew clean && cd ..
npx react-native start --reset-cache
npm run android
```

**App crashes on launch:**
- Check native logs: `npx react-native log-android`
- Check for missing dependencies
- Rebuild: `cd android && ./gradlew clean && cd ..`

**Cannot connect to API:**
- Verify backend is running
- Check IP address in `constants.ts`
- Use `10.0.2.2` for emulator
- Use computer's IP for physical device
- Check firewall settings

---

## Performance

### List Optimization

Use `FlatList` for long lists:

```typescript
import { FlatList } from 'react-native';

<FlatList
  data={orders}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <OrderCard order={item} />}
  getItemLayout={(data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })}
  removeClippedSubviews
  maxToRenderPerBatch={10}
  windowSize={10}
/>
```

### Image Optimization

```typescript
import { Image } from 'react-native';

<Image
  source={{ uri: imageUrl }}
  style={styles.image}
  resizeMode="cover"
  defaultSource={require('@/assets/placeholder.png')}
/>
```

### Bundle Size Management

**Check bundle size:**
```bash
npx react-native-bundle-visualizer
```

**Reduce bundle size:**
- Use dynamic imports for large libraries
- Remove unused dependencies
- Enable Hermes engine (already enabled)

### Memory Management

- Unsubscribe from listeners in `useEffect` cleanup
- Cancel API requests when component unmounts
- Avoid memory leaks with proper cleanup

```typescript
useEffect(() => {
  const subscription = someEventEmitter.subscribe(handleEvent);
  
  return () => {
    subscription.unsubscribe(); // Cleanup
  };
}, []);
```

---

## Building for Production

### Generate Release APK

**1. Update version in `android/app/build.gradle`:**
```gradle
defaultConfig {
    versionCode 2
    versionName "1.1.0"
}
```

**2. Generate release build:**
```bash
cd android
./gradlew assembleRelease
```

**3. Find APK:**
```
android/app/build/outputs/apk/release/app-release.apk
```

### Signing Configuration

**Generate keystore:**
```bash
keytool -genkeypair -v -storetype PKCS12 -keystore olmosq-release.keystore \
  -alias olmosq -keyalg RSA -keysize 2048 -validity 10000
```

**Configure in `android/gradle.properties`:**
```properties
MYAPP_RELEASE_STORE_FILE=olmosq-release.keystore
MYAPP_RELEASE_KEY_ALIAS=olmosq
MYAPP_RELEASE_STORE_PASSWORD=****
MYAPP_RELEASE_KEY_PASSWORD=****
```

### Version Management

**Semantic versioning:**
- Major: Breaking changes (e.g., 2.0.0)
- Minor: New features (e.g., 1.1.0)
- Patch: Bug fixes (e.g., 1.0.1)

**Update version:**
1. Update `android/app/build.gradle` (versionCode, versionName)
2. Update `package.json` (version)
3. Create git tag: `git tag v1.1.0`

### Distribution

**Install on tablet:**
```bash
adb install android/app/build/outputs/apk/release/app-release.apk
```

**Or upload to device and install manually**

---

## Additional Resources

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [React Navigation Docs](https://reactnavigation.org/docs/getting-started)
- [React Query Docs](https://tanstack.com/query/latest/docs/react/overview)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)

---

## Quick Reference

### Common Commands

```bash
# Start development
npm start
npm run android

# Clean and rebuild
cd android && ./gradlew clean && cd ..
npx react-native start --reset-cache

# View logs
npx react-native log-android

# Build release
cd android && ./gradlew assembleRelease

# Install APK
adb install path/to/app.apk

# Dev menu
adb shell input keyevent 82
```

### File Locations

- API: `src/api/`
- Components: `src/components/`
- Screens: `src/screens/`
- Hooks: `src/hooks/`
- Types: `src/types/`
- Utils: `src/utils/`
- Config: `src/utils/constants.ts`
