import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(), // Using text for UUIDs by default with Drizzle
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  // createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`), // Example
  // updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`), // Example
});
