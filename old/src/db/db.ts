import Database from "@tauri-apps/plugin-sql";
import { SCHEMAS } from "./schema";
import {
  Page,
  PageUpdates,
  User,
  UserUpdates,
  Workspace,
  WorkspaceUpdates,
} from "@/types/db";

const DB_NAME = "sqlite:student-workspace.db";

class DBError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DBError";
  }
}

class DB {
  private static instance: Database | null = null;

  static async init(): Promise<void> {
    try {
      if (!this.instance) {
        this.instance = await Database.load(`sqlite:${DB_NAME}`);
        await Promise.all([
          this.instance.execute(SCHEMAS.users),
          this.instance.execute(SCHEMAS.workspaces),
          this.instance.execute(SCHEMAS.pages),
          this.instance.execute(SCHEMAS.favorite_pages),
        ]);
        console.info("Database initialized and schemas created");
      }
    } catch (error) {
      console.error("Failed to initialize database:", error);
      throw new DBError("Database initialization failed");
    }
  }

  private static async get(): Promise<Database> {
    if (!this.instance) {
      await this.init();
    }
    return this.instance!;
  }

  private static convertBooleans<T>(item: T): T {
    const converted: any = { ...item };
    for (const key in converted) {
      if (converted[key] === 1) {
        converted[key] = true;
      } else if (converted[key] === 0) {
        converted[key] = false;
      }
    }
    return converted as T;
  }

  private static async executeWithErrorHandling<T>(
    operation: () => Promise<T>,
  ): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      console.error("Database operation failed:", error);
      throw new DBError("Database operation failed");
    }
  }

  static auth = {
    async getCurrentUser(): Promise<User | null> {
      return DB.executeWithErrorHandling(async () => {
        const db = await DB.get();
        const results = await db.select<User[]>(
          "SELECT * FROM users WHERE is_current = 1",
        );
        return results[0] ? DB.convertBooleans(results[0]) : null;
      });
    },

    async setCurrentUser(userId: string): Promise<void> {
      return DB.executeWithErrorHandling(async () => {
        const db = await DB.get();
        await db.execute("UPDATE users SET is_current = 0");
        await db.execute("UPDATE users SET is_current = 1 WHERE id = ?", [
          userId,
        ]);
      });
    },

    async clearCurrentUser(): Promise<void> {
      return DB.executeWithErrorHandling(async () => {
        const db = await DB.get();
        await db.execute("UPDATE users SET is_current = 0");
      });
    },

    async isAuthenticated(): Promise<boolean> {
      const currentUser = await this.getCurrentUser();
      return currentUser !== null;
    },
  };

  static users = {
    async create(user: Omit<User, "id">): Promise<string> {
      return DB.executeWithErrorHandling(async () => {
        const db = await DB.get();
        const result = await db.execute(
          `INSERT INTO users (name, image, email, role) 
           VALUES (?, ?, ?, ?)`,
          [user.name, user.image, user.email, user.role],
        );
        return result.lastInsertId as unknown as string;
      });
    },

    async get(id: string): Promise<User | null> {
      return DB.executeWithErrorHandling(async () => {
        const db = await DB.get();
        const results = await db.select<User[]>(
          "SELECT * FROM users WHERE id = ?",
          [id],
        );
        return results[0] ? DB.convertBooleans(results[0]) : null;
      });
    },

    async update(id: string, updates: UserUpdates): Promise<number> {
      return DB.executeWithErrorHandling(async () => {
        const db = await DB.get();
        const setParts = Object.keys(updates).map((key) => `${key} = ?`);
        const sql = `UPDATE users SET ${setParts.join(", ")} WHERE id = ?`;
        const params = [...Object.values(updates), id];
        const result = await db.execute(sql, params);
        return result.rowsAffected;
      });
    },

    async delete(id: string): Promise<number> {
      return DB.executeWithErrorHandling(async () => {
        const db = await DB.get();
        const result = await db.execute("DELETE FROM users WHERE id = ?", [id]);
        return result.rowsAffected;
      });
    },

    async list(): Promise<User[]> {
      return DB.executeWithErrorHandling(async () => {
        const db = await DB.get();
        const results = await db.select<User[]>("SELECT * FROM users");
        return results.map(DB.convertBooleans);
      });
    },
  };

  static workspaces = {
    async create(workspace: Omit<Workspace, "id">): Promise<string> {
      return DB.executeWithErrorHandling(async () => {
        const db = await DB.get();
        const result = await db.execute(
          `INSERT INTO workspaces (name, owner_id, updated_at, archived)
         VALUES (?, ?, ?, ?)`,
          [
            workspace.name,
            workspace.owner_id,
            workspace.updated_at,
            workspace.archived ?? false,
          ],
        );
        return result.lastInsertId as unknown as string;
      });
    },

    async setCurrentWorkspace(workspaceId: string): Promise<void> {
      return DB.executeWithErrorHandling(async () => {
        const db = await DB.get();
        await db.execute("UPDATE workspaces SET is_current = 0");
        await db.execute("UPDATE workspaces SET is_current = 1 WHERE id = ?", [
          workspaceId,
        ]);
      });
    },

    async getCurrentWorkspace(): Promise<Workspace | null> {
      return DB.executeWithErrorHandling(async () => {
        const db = await DB.get();
        const results = await db.select<Workspace[]>(
          "SELECT * FROM workspaces WHERE is_current = 1",
        );
        return results[0] ? DB.convertBooleans(results[0]) : null;
      });
    },

    async clearCurrentWorkspace(): Promise<void> {
      return DB.executeWithErrorHandling(async () => {
        const db = await DB.get();
        await db.execute("UPDATE workspaces SET is_current = 0");
      });
    },

    async get(id: string): Promise<Workspace | null> {
      return DB.executeWithErrorHandling(async () => {
        const db = await DB.get();
        const results = await db.select<Workspace[]>(
          "SELECT * FROM workspaces WHERE id = ?",
          [id],
        );
        return results[0] ? DB.convertBooleans(results[0]) : null;
      });
    },

    async update(id: string, updates: WorkspaceUpdates): Promise<number> {
      return DB.executeWithErrorHandling(async () => {
        const db = await DB.get();
        const setParts = Object.keys(updates).map((key) => `${key} = ?`);
        const sql = `UPDATE workspaces SET ${setParts.join(", ")} WHERE id = ?`;
        const params = [...Object.values(updates), id];
        const result = await db.execute(sql, params);
        return result.rowsAffected;
      });
    },

    async delete(id: string): Promise<number> {
      return DB.executeWithErrorHandling(async () => {
        const db = await DB.get();
        const result = await db.execute("DELETE FROM workspaces WHERE id = ?", [
          id,
        ]);
        return result.rowsAffected;
      });
    },

    async list(): Promise<Workspace[]> {
      return DB.executeWithErrorHandling(async () => {
        const db = await DB.get();
        const results = await db.select<Workspace[]>(
          "SELECT * FROM workspaces",
        );
        return results.map(DB.convertBooleans);
      });
    },
  };

  static pages = {
    async create(page: Omit<Page, "id">): Promise<string> {
      return DB.executeWithErrorHandling(async () => {
        const db = await DB.get();
        const result = await db.execute(
          `INSERT INTO pages (title, workspace_id, creator_id, content, image_banner, emoji, updated_at, type, parent_id, last_edited_by, archived)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            page.title,
            page.workspace_id,
            page.creator_id,
            page.content,
            page.image_banner,
            page.emoji,
            page.updated_at,
            page.type,
            page.parent_id,
            page.last_edited_by,
            page.archived ?? false,
          ],
        );
        return result.lastInsertId as unknown as string;
      });
    },

    async get(id: string): Promise<Page | null> {
      return DB.executeWithErrorHandling(async () => {
        const db = await DB.get();
        const results = await db.select<Page[]>(
          "SELECT * FROM pages WHERE id = ?",
          [id],
        );
        return results[0] ? DB.convertBooleans(results[0]) : null;
      });
    },

    async update(id: string, updates: PageUpdates): Promise<number> {
      return DB.executeWithErrorHandling(async () => {
        const db = await DB.get();
        const setParts = Object.keys(updates).map((key) => `${key} = ?`);
        const sql = `UPDATE pages SET ${setParts.join(", ")} WHERE id = ?`;
        const params = [...Object.values(updates), id];
        const result = await db.execute(sql, params);
        return result.rowsAffected;
      });
    },

    async delete(id: string): Promise<number> {
      return DB.executeWithErrorHandling(async () => {
        const db = await DB.get();
        const result = await db.execute("DELETE FROM pages WHERE id = ?", [id]);
        return result.rowsAffected;
      });
    },

    async list(): Promise<Page[]> {
      return DB.executeWithErrorHandling(async () => {
        const db = await DB.get();
        const results = await db.select<Page[]>("SELECT * FROM pages");
        return results.map(DB.convertBooleans);
      });
    },

    async searchPages(query: string): Promise<Page[]> {
      return DB.executeWithErrorHandling(async () => {
        const db = await DB.get();
        const results = await db.select<Page[]>(
          `SELECT * FROM pages
         WHERE title LIKE ? OR content LIKE ?`,
          [`%${query}%`, `%${query}%`],
        );
        return results.map(DB.convertBooleans);
      });
    },

    async getPagesByWorkspace(workspaceId: string): Promise<Page[]> {
      return DB.executeWithErrorHandling(async () => {
        const db = await DB.get();
        const results = await db.select<Page[]>(
          "SELECT * FROM pages WHERE workspace_id = ?",
          [workspaceId],
        );
        return results.map(DB.convertBooleans);
      });
    },

    async updateContent(id: string, content: string): Promise<number> {
      return DB.executeWithErrorHandling(async () => {
        const db = await DB.get();
        const result = await db.execute(
          "UPDATE pages SET content = ?, updated_at = ? WHERE id = ?",
          [content, Date.now(), id],
        );
        return result.rowsAffected;
      });
    },
  };

  // Similar improvements for workspaces and pages...

  static async executeQuery<T>(sql: string, params: any[] = []): Promise<T[]> {
    return DB.executeWithErrorHandling(async () => {
      const db = await this.get();
      const results = await db.select<T[]>(sql, params);
      return results.map(DB.convertBooleans);
    });
  }
}

export default DB;
