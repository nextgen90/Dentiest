import { pgTable, serial, varchar, timestamp, text } from 'drizzle-orm/pg-core';

export const appointments = pgTable('appointments', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  date: timestamp('date').notNull(),
  time: varchar('time', { length: 50 }),
  service: varchar('service', { length: 100 }).notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
