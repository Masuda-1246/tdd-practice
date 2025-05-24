import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3'; // Use better-sqlite3
import * as schema from './schema';

// For now, using an in-memory database for simplicity.
// Replace with a file path for persistent storage e.g., new Database('sqlite.db')
export const sqlite = new Database(':memory:');
export const db = drizzle(sqlite, { schema });

// Later, you might want a function to get DB instance for different environments
// export const getDb = (dbPath: string = 'sqlite.db') => {
//   const sqlite = new Database(dbPath);
//   return drizzle(sqlite, { schema });
// }
