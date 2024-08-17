use crate::models::User;
use crate::services::{DatabaseService, ConvexSyncService};
use tauri::State;

#[tauri::command]
pub async fn create_user(
    db: State<'_, DatabaseService>,
    convex: State<'_, ConvexSyncService>,
    user: User,
) -> Result<String, String> {
    let id = db.create_user(&user).await.map_err(|e| e.to_string())?;

    if user.is_premium {
        convex.sync_user(&user).await.map_err(|e| e.to_string())?;
    }

    Ok(id)
}

#[tauri::command]
pub async fn get_user(
    db: State<'_, DatabaseService>,
    id: String,
) -> Result<Option<User>, String> {
    db.get_user(&id).await.map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn update_user(
    db: State<'_, DatabaseService>,
    convex: State<'_, ConvexSyncService>,
    user: User,
) -> Result<(), String> {
    db.update_user(&user).await.map_err(|e| e.to_string())?;

    if user.is_premium {
        convex.sync_user(&user).await.map_err(|e| e.to_string())?;
    }

    Ok(())
}

// Add more user related commands as needed