# Backend API Implementation Guide

This guide shows you how to add REST API endpoints to your olmosq-qr backend to support the React Native app.

## Architecture Overview

**Current:** Next.js with Server Actions (cookie-based auth)
**Target:** Next.js + Express API (Bearer token auth for mobile)

## Step 1: Install Express Dependencies

```bash
cd /home/ferostzz/Desktop/project/olmosq-qr
npm install express cors helmet
npm install -D @types/express @types/cors
```

## Step 2: Modify JWT for Bearer Tokens

The mobile app uses Bearer tokens instead of cookies. Update `lib/staff-auth/jwt.ts`:

```typescript
// Add a function to verify Bearer token
export async function verifyBearerToken(authHeader: string | undefined) {
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }
  
  const token = authHeader.slice(7);
  return verifyJWT(token);
}
```

## Step 3: Create Express API Routes

Create `server/api/index.ts`:

```typescript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { authRoutes } from './routes/auth.routes';
import { ordersRoutes } from './routes/orders.routes';
import { shiftsRoutes } from './routes/shifts.routes';
// ... other routes

export function createApiRouter() {
  const router = express.Router();
  
  // Middleware
  router.use(cors());
  router.use(helmet());
  router.use(express.json());
  
  // Routes
  router.use('/auth', authRoutes);
  router.use('/orders', ordersRoutes);
  router.use('/shifts', shiftsRoutes);
  // ... other routes
  
  return router;
}
```

## Step 4: Convert Server Actions to Routes

Example: Convert `app/actions/orders.ts` to `server/api/routes/orders.routes.ts`:

**Before (Server Action):**
```typescript
export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  const unauthorized = await getUnauthorizedStaffActionResult();
  if (unauthorized) return unauthorized;
  
  // Update logic...
}
```

**After (Express Route):**
```typescript
import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

router.patch('/:id/status', requireAuth, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  // Reuse the same business logic from lib/orders
  // Return JSON response
  res.json({ success: true, order });
});

export const ordersRoutes = router;
```

## Step 5: Create Auth Middleware

Create `server/api/middleware/auth.middleware.ts`:

```typescript
import { Request, Response, NextFunction } from 'express';
import { verifyBearerToken } from '@/lib/staff-auth/jwt';

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const payload = await verifyBearerToken(req.headers.authorization);
  
  if (!payload) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  req.staffUser = payload; // Attach to request
  next();
}
```

## Step 6: Update server.ts

```typescript
import { createServer } from 'node:http';
import express from 'express';
import next from 'next';
import { createApiRouter } from './server/api';
import { attachOrderWebSocketServer } from '@/server/order-websocket-server';

const dev = process.env.NODE_ENV !== 'production';
const port = Number(process.env.PORT || 3000);
const hostname = process.env.HOSTNAME || '0.0.0.0';

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

async function main() {
  await app.prepare();
  const handleUpgrade = app.getUpgradeHandler();

  // Create Express app
  const expressApp = express();
  
  // Mount API routes
  expressApp.use('/api', createApiRouter());
  
  // Next.js handler for everything else
  expressApp.all('*', (req, res) => handle(req, res));

  const server = createServer(expressApp);
  attachOrderWebSocketServer(server, handleUpgrade);

  server.listen(port, hostname, () => {
    console.log(`> Server listening at http://${hostname}:${port}`);
  });
}

main();
```

## Step 7: Update WebSocket Auth

Modify `server/order-websocket-server.ts` to accept Bearer token from query param:

```typescript
const token = url.searchParams.get('token');
const user = await verifyJWT(token);

if (!user) {
  socket.close();
  return;
}
```

## Complete Route Mapping

| Server Action | Express Route | Method |
|--------------|---------------|--------|
| `loginStaffAction` | `/api/auth/login` | POST |
| `logoutStaffAction` | `/api/auth/logout` | POST |
| `updateOrderStatus` | `/api/orders/:id/status` | PATCH |
| `createReceiptAction` | `/api/orders/:id/payment` | POST |
| `openShiftAction` | `/api/shifts/open` | POST |
| `closeShiftAction` | `/api/shifts/close` | POST |
| `syncMenuAction` | `/api/loyverse/sync-menu` | POST |
| `syncPaymentTypesAction` | `/api/loyverse/sync-payments` | POST |

## Testing Your API

Use curl or Postman:

```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"staff","password":"1234"}'

# Get orders (with token)
curl http://localhost:3000/api/orders \
  -H "Authorization: Bearer <your-token-here>"
```

## Next Steps

1. Implement all routes listed in the mapping table
2. Test each endpoint with Postman
3. Update WebSocket authentication
4. Test the React Native app against your API
5. Deploy backend with API routes

## Reference

See the React Native app's API client in:
- `omc/src/api/*.api.ts` - API method signatures
- `omc/src/types/api.types.ts` - Request/response types

These files show exactly what the mobile app expects from each endpoint.
