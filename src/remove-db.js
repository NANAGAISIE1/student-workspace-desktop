import { remove, BaseDirectory } from "@tauri-apps/plugin-fs";

async function deleteDatabase() {
  try {
    // Delete the SQLite database file
    await remove("sqlite:student-workspace.db", {
      baseDir: BaseDirectory.AppLocalData,
    });

    console.log("Database file deleted successfully.");
  } catch (error) {
    console.error("Failed to delete the database:", error);
  }
}

deleteDatabase();
