"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointments = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.appointments = (0, pg_core_1.pgTable)('appointments', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.varchar)('name', { length: 256 }).notNull(),
    email: (0, pg_core_1.varchar)('email', { length: 256 }).notNull(),
    phone: (0, pg_core_1.varchar)('phone', { length: 20 }).notNull(),
    date: (0, pg_core_1.timestamp)('date').notNull(),
    time: (0, pg_core_1.varchar)('time', { length: 50 }),
    service: (0, pg_core_1.varchar)('service', { length: 100 }).notNull(),
    notes: (0, pg_core_1.text)('notes'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
});
