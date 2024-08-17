import { TokenStorage } from "@convex-dev/auth/react";
import { Store } from "@tauri-apps/plugin-store";

const sessionStore = new Store("sessions.bin");

export const store: TokenStorage = {
  getItem: async (key: string) => {
    return (await sessionStore.get(key)) as string;
  },
  setItem: async (key: string, value: any) => {
    return await sessionStore.set(key, value);
  },
  removeItem: async (key: string) => {
    await sessionStore.delete(key);
  },
};
