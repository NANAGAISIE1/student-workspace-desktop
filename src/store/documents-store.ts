import { Store } from "@tauri-apps/plugin-store";
import { Doc, Id } from "convex/_generated/dataModel";

const documentStore = new Store("documents.bin");

export const documentPersistenceStore = {
  getDocument: async (key: Id<"documents">) => {
    return (await documentStore.get(key)) as string;
  },
  setDocument: async (key: Id<"documents">, value: Doc<"documents">) => {
    return await documentStore.set(key, value);
  },
  removeDocument: async (key: Id<"documents">) => {
    await documentStore.delete(key);
  },
};
