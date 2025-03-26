// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { index, pgTableCreator } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `cardepot_${name}`);

export const images = createTable(
  "images",
  (d) => ({
    id: d.integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: d.varchar("name",{ length: 256 }).notNull(),
    url: d. varchar("url", {length: 1024}).notNull(),
    userId: d. varchar("userId",{length: 256}).notNull(),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
    description: d.varchar("description", { length: 1024 }),
    engine: d.varchar("engine", { length: 1024 }), 
    transmission: d.varchar("transmission", { length: 1024 }),  
    fuel: d.varchar("fuel",{length: 256}),
    displacement: d.varchar("displacement",{length: 256}), 
  }),
  (t) => [index("name_idx").on(t.name)],
);
