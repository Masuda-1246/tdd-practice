import { z } from 'zod';
import type { User } from '../entities/user';
import { UserSchema } from '../entities/user';

export const GetUserInputSchema = z.object({
  id: z.string().uuid(),
});
export type GetUserInput = z.infer<typeof GetUserInputSchema>;

export const GetUserOutputSchema = UserSchema.nullable(); // User might not be found
export type GetUserOutput = z.infer<typeof GetUserOutputSchema>;

export interface GetUserUseCase {
  execute(input: GetUserInput): Promise<GetUserOutput>;
}
