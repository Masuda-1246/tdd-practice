import type { CreateUserInput, CreateUserOutput, CreateUserUseCase } from '@/domain/usecases/createUser';
import type { GetUserInput, GetUserOutput, GetUserUseCase } from '@/domain/usecases/getUser';
import type { UserRepository } from '@/domain/repositories/userRepository';
import { UserSchema } from '@/domain/entities/user'; // Needed for potential validation or transformation
import { v4 as uuidv4 } from 'uuid'; // To generate IDs

// A simple error class for domain/application specific errors
export class ApplicationError extends Error {
  constructor(message: string, public readonly metadata?: Record<string, unknown>) {
    super(message);
    this.name = 'ApplicationError';
  }
}

export class UserService implements CreateUserUseCase, GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: CreateUserInput): Promise<CreateUserOutput>; // For CreateUserUseCase
  async execute(input: GetUserInput): Promise<GetUserOutput>; // For GetUserUseCase

  async execute(input: CreateUserInput | GetUserInput): Promise<CreateUserOutput | GetUserOutput> {
    if ('email' in input) { // Type guard for CreateUserInput
      // Validate input again at application layer, though Zod in routes usually handles it
      // This is more about business rule validation if any
      const existingUser = await this.userRepository.findByEmail(input.email);
      if (existingUser) {
        throw new ApplicationError('User with this email already exists.', { email: input.email });
      }

      const newUser: CreateUserOutput = await this.userRepository.create({
        ...input,
      });
      return newUser;
    } else if ('id' in input) { // Type guard for GetUserInput
      const user = await this.userRepository.findById(input.id);
      return user;
    }
    throw new ApplicationError('Invalid input for UserService.');
  }
}
