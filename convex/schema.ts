import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  documents: defineTable({
    title: v.string(),
    userId: v.id("users"),
    content: v.optional(v.string()),
    emoji: v.optional(v.string()),
  }),
});

export default schema;
