import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: varchar("clerk_id", { length: 255 }).notNull().unique(),
  email: text("email").notNull(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const hookGenerations = pgTable("hook_generations", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: varchar("user_id", { length: 255 }).notNull(), // Clerk userId
  niche: text("niche").notNull(),
  topic: text("topic").notNull(),
  audience: text("audience").notNull(),
  platform: text("platform").notNull(),
  tone: text("tone").notNull(),
  goal: text("goal").notNull(),
  hookCount: text("hook_count").notNull(),
  generatedHooks: text("generated_hooks").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
