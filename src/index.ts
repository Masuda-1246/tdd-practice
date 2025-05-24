import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { serve } from '@hono/node-server'; // For Node.js environment

import { db } from '@/infrastructure/database/drizzle'; // Drizzle instance
import { UserRepositoryImpl } from '@/infrastructure/repositories/userRepositoryImpl';
import { UserService } from '@/application/services/userService';
import { userRoutes } from '@/interfaces/http/routes/userRoutes';

// --- Dependencies Setup ---
// Ideally, use a proper dependency injection container for larger apps
const userRepository = new UserRepositoryImpl(); // Uses the db instance from drizzle.ts
const userService = new UserService(userRepository);

// --- Hono App Setup ---
const app = new Hono();

// --- Middleware ---
app.use('*', logger()); // Basic logger for all requests

// --- Routes ---
app.get('/', (c) => {
  return c.text('Hello Hono! This is the API root.');
});

// Mount user routes
app.route('/users', userRoutes(userService)); // Pass userService instance

// --- Error Handling ---
app.onError((err, c) => {
  console.error(`Unhandled application error: ${err.message}`, err);
  // Differentiate between known error types and unknown ones if needed
  // For now, a generic 500 response
  return c.json({ message: 'Internal Server Error', error: err.message }, 500);
});

// --- Server Start ---
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port: port,
});

// Export the app instance for potential use in serverless environments or testing
export default app;
