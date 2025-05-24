import type { User } from '../entities/user';

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: Omit<User, 'id'>): Promise<User>;
  // update(id: string, user: Partial<Omit<User, 'id'>>): Promise<User | null>; // Example for future
  // delete(id: string): Promise<boolean>; // Example for future
}
