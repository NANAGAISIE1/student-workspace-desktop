export const SCHEMAS = {
  users: `
  CREATE TABLE users (
      id TEXT PRIMARY KEY,
      name TEXT,
      email TEXT UNIQUE,
      image TEXT,
      is_current INTEGER,
      role TEXT CHECK(role IN ('student', 'lecturer', 'admin'))
  );
  CREATE INDEX idx_users_email ON users(email);`,

  workspaces: `
  CREATE TABLE workspaces (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      updated_at INTEGER NOT NULL,
      archived INTEGER,
      is_current INTEGER,
      owner_id TEXT NOT NULL,
      FOREIGN KEY(owner_id) REFERENCES users(id)
  );
  CREATE INDEX idx_workspaces_owner_id ON workspaces(owner_id);
  CREATE INDEX idx_workspaces_archived ON workspaces(archived);`,

  pages: `
  CREATE TABLE pages (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      workspace_id TEXT NOT NULL,
      creator_id TEXT NOT NULL,
      content TEXT,
      image_banner TEXT,
      emoji TEXT,
      updated_at INTEGER NOT NULL,
      type TEXT CHECK(type IN ('page', 'todo', 'calendar')),
      parent_id TEXT,
      archived INTEGER,
      FOREIGN KEY(workspace_id) REFERENCES workspaces(id),
      FOREIGN KEY(creator_id) REFERENCES users(id),
      FOREIGN KEY(parent_id) REFERENCES pages(id)
  );
  CREATE INDEX idx_pages_workspace_id ON pages(workspace_id);
  CREATE INDEX idx_pages_creator_id ON pages(creator_id);
  CREATE INDEX idx_pages_workspace_id_creator_id ON pages(workspace_id, creator_id);
  CREATE INDEX idx_pages_workspace_id_parent_id ON pages(workspace_id, parent_id);
  CREATE INDEX idx_pages_parent_id ON pages(parent_id);
  CREATE INDEX idx_pages_title ON pages(title);
  CREATE INDEX idx_pages_content ON pages(content);
  CREATE INDEX idx_pages_emoji ON pages(emoji);`,

  favorite_pages: `
  CREATE TABLE favorite_pages (
      page_id TEXT NOT NULL,
      creator_id TEXT NOT NULL,
      workspace_id TEXT NOT NULL,
      PRIMARY KEY(page_id, creator_id),
      FOREIGN KEY(page_id) REFERENCES pages(id),
      FOREIGN KEY(creator_id) REFERENCES users(id),
      FOREIGN KEY(workspace_id) REFERENCES workspaces(id)
  );
  CREATE INDEX idx_favorite_pages_creator_id ON favorite_pages(creator_id);
  CREATE INDEX idx_favorite_pages_workspace_id ON favorite_pages(workspace_id);
`,
};
