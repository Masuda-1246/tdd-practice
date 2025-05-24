import { z } from 'zod';
import type { User } from '../entities/user';
import { UserSchema } from '../entities/user';

export const CreateUserInputSchema = UserSchema.omit({ id: true });
export type CreateUserInput = z.infer<typeof CreateUserInputSchema>;

export const CreateUserOutputSchema = UserSchema;
export type CreateUserOutput = z.infer<typeof CreateUserOutputSchema>;

export interface CreateUserUseCase {
  execute(input: CreateUserInput): Promise<CreateUserOutput>;
}
