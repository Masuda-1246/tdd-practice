import { db } from '../database/drizzle';
import * as schema from '../database/schema';
import type { UserRepository } from '@/domain/repositories/userRepository';
import type { User } from '@/domain/entities/user';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

export class UserRepositoryImpl implements UserRepository {
  async findById(id: string): Promise<User | null> {
    const result = await db.select().from(schema.users).where(eq(schema.users.id, id)).limit(1);
    return result.length > 0 ? result[0] : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await db.select().from(schema.users).where(eq(schema.users.email, email)).limit(1);
    return result.length > 0 ? result[0] : null;
  }

  async create(userInput: Omit<User, 'id'>): Promise<User> {
    const newId = uuidv4();
    const newUser: User = {
      ...userInput,
      id: newId,
    };
    await db.insert(schema.users).values(newUser);
    return newUser;
  }
}
