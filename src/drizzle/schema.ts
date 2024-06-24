import { relations, InferSelectModel, InferInsertModel } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  uuid,
  uniqueIndex,
  varchar,
  timestamp,
  primaryKey,
} from "drizzle-orm/pg-core";

export const userRole = pgEnum("userRole", ["BASIC", "ADMIN"]);

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    age: integer("age").notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    emailUpdates: boolean("emailUpdates").notNull().default(false),
    role: userRole("userRole").default("BASIC").notNull(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  },
  // Function to define additional constrains or indexes
  (table) => {
    return {
      emailIndex: uniqueIndex("emailIndex").on(table.email),
      // In this way it's possible to create a unique combination of two columns
      // Ex: uniqueNameAndAge: unique("uniqueNameAndAge").on(table.name, table.age),
    };
  }
);

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
export const userRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  comments: many(comments),
  likes: many(likes),
}));

export const posts = pgTable("posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  content: varchar("content", { length: 255 }).notNull(),
  authorId: uuid("authorId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const postRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
  categories: many(postCategories),
  comments: many(comments),
  likes: many(likes),
}));

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  posts: many(postCategories),
}));

export const postCategories = pgTable(
  "postCategories",
  {
    postId: uuid("postId")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    categoryId: uuid("categoryId")
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.postId, table.categoryId] }),
    };
  }
);

export const postCategoriesRelations = relations(postCategories, ({ one }) => ({
  posts: one(posts, {
    fields: [postCategories.postId],
    references: [posts.id],
  }),
  categories: one(categories, {
    fields: [postCategories.categoryId],
    references: [categories.id],
  }),
}));

export const comments = pgTable("comments", {
  id: uuid("id").primaryKey().defaultRandom(),
  content: varchar("content", { length: 500 }).notNull(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  postId: uuid("postId")
    .notNull()
    .references(() => posts.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const commentRelations = relations(comments, ({ one }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
  user: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),
}));

export const likes = pgTable("likes", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  postId: uuid("postId")
    .notNull()
    .references(() => posts.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const likeRelations = relations(likes, ({ one }) => ({
  post: one(posts, {
    fields: [likes.postId],
    references: [posts.id],
  }),
  user: one(users, {
    fields: [likes.userId],
    references: [users.id],
  }),
}));
