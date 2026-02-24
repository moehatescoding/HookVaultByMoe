import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

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

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
});

export const subCategories = pgTable("sub_categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  categoryId: uuid("category_id").references(() => categories.id).notNull(),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
});

export const scriptTypes = pgTable("script_types", {
  id: uuid("id").primaryKey().defaultRandom(),
  subCategoryId: uuid("sub_category_id").references(() => subCategories.id).notNull(),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
});

export const scriptGenerations = pgTable("script_generations", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  categoryId: uuid("category_id").references(() => categories.id).notNull(),
  subCategoryId: uuid("sub_category_id").references(() => subCategories.id).notNull(),
  scriptTypeId: uuid("script_type_id").references(() => scriptTypes.id).notNull(),
  inputText: text("input_text"),
  outputText: text("output_text").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  subCategories: many(subCategories),
  generations: many(scriptGenerations),
}));

export const subCategoriesRelations = relations(subCategories, ({ one, many }) => ({
  category: one(categories, {
    fields: [subCategories.categoryId],
    references: [categories.id],
  }),
  scriptTypes: many(scriptTypes),
  generations: many(scriptGenerations),
}));

export const scriptTypesRelations = relations(scriptTypes, ({ one, many }) => ({
  subCategory: one(subCategories, {
    fields: [scriptTypes.subCategoryId],
    references: [subCategories.id],
  }),
  generations: many(scriptGenerations),
}));

export const scriptGenerationsRelations = relations(scriptGenerations, ({ one }) => ({
  category: one(categories, {
    fields: [scriptGenerations.categoryId],
    references: [categories.id],
  }),
  subCategory: one(subCategories, {
    fields: [scriptGenerations.subCategoryId],
    references: [subCategories.id],
  }),
  scriptType: one(scriptTypes, {
    fields: [scriptGenerations.scriptTypeId],
    references: [scriptTypes.id],
  }),
}));
