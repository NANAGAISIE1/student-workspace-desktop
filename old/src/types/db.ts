export interface User {
  id: string;
  name?: string;
  image?: string;
  email?: string;
  role?: "student" | "lecturer" | "admin";
  is_current?: boolean;
}

export interface Workspace {
  id: string;
  name: string;
  owner_id: string;
  updated_at: number;
  archived?: boolean;
}

export interface Page {
  id: string;
  title: string;
  workspace_id: string;
  creator_id: string;
  content?: string;
  image_banner?: string;
  emoji?: string;
  updated_at: number;
  type?: "page" | "todo" | "calendar";
  parent_id?: string;
  last_edited_by?: string;
  archived?: boolean;
}

export interface FavoritePage {
  page_id: string;
  creator_id: string;
  workspace_id: string;
}

export type UserUpdates = Partial<Omit<User, "id">>;
export type WorkspaceUpdates = Partial<Omit<Workspace, "id">>;
export type PageUpdates = Partial<Omit<Page, "id">>;
