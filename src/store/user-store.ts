import { Doc, Id } from "@convex/dataModel";
import { Store } from "@tauri-apps/plugin-store";

const userStore = new Store("users.bin");

export const userPersistenceStore = {
  getUser: async (key: Id<"users">) => {
    return (await userStore.get(key)) as Id<"users">;
  },
  setUser: async (key: Id<"users">, value: Doc<"users">) => {
    return await userStore.set(key, value);
  },
  removeUser: async (key: Id<"users">) => {
    await userStore.delete(key);
  },
};
