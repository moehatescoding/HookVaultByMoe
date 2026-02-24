import { pgTable, text, timestamp, uuid, varchar, index, integer } from "drizzle-orm/pg-core";

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
  hookCount: integer("hook_count").notNull(),
  generatedHooks: text("generated_hooks").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => {
  return [
    index("hook_user_created_idx").on(table.userId, table.createdAt),
  ];
});

export const storyGenerations = pgTable("story_generations", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  niche: text("niche").notNull(),
  storyType: text("story_type").notNull(),
  audience: text("audience").notNull(),
  platform: text("platform").notNull(),
  tone: text("tone").notNull(),
  goal: text("goal").notNull(),
  length: text("length").notNull(),
  generatedStories: text("generated_stories").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => {
  return [
    index("story_user_created_idx").on(table.userId, table.createdAt),
  ];
});
