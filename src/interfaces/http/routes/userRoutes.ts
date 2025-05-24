import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import type { UserService } from '@/application/services/userService';
import { CreateUserInputSchema } from '@/domain/usecases/createUser';
import { GetUserInputSchema } from '@/domain/usecases/getUser';
import { ApplicationError } from '@/application/services/userService'; // Assuming ApplicationError is exported

export const userRoutes = (userService: UserService) => {
  const app = new Hono();

  // POST /users - Create a new user
  app.post(
    '/',
    zValidator('json', CreateUserInputSchema, (result, c) => {
      if (!result.success) {
        return c.json({ errors: result.error.flatten().fieldErrors }, 400);
      }
    }),
    async (c) => {
      const userInput = c.req.valid('json');
      try {
        const newUser = await userService.execute(userInput);
        return c.json(newUser, 201);
      } catch (error) {
        if (error instanceof ApplicationError) {
          return c.json({ message: error.message, details: error.metadata }, 400); // Bad Request for known app errors
        }
        console.error('Create user error:', error);
        return c.json({ message: 'Internal Server Error' }, 500);
      }
    }
  );

  // GET /users/:id - Get a user by ID
  app.get(
    '/:id',
    zValidator('param', GetUserInputSchema, (result, c) => {
        if (!result.success) {
            // If validation fails on params, it's often a 400 or 404 depending on context
            // Here, if ID format is wrong, it's a client error.
            return c.json({ errors: result.error.flatten().paramErrors }, 400);
        }
    }),
    async (c) => {
      const { id } = c.req.valid('param');
      try {
        const user = await userService.execute({ id });
        if (!user) {
          return c.json({ message: 'User not found' }, 404);
        }
        return c.json(user, 200);
      } catch (error) {
        // No specific ApplicationError expected here unless GetUserUseCase starts throwing them
        console.error('Get user error:', error);
        return c.json({ message: 'Internal Server Error' }, 500);
      }
    }
  );

  return app;
};
