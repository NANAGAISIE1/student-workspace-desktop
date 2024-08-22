use crate::models::User;
use crate::services::{ConvexSyncService, DatabaseService};
use tauri::State;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum CreateUserError {
    #[error("Error signing up user: {0}")]
    SignUpError(String),
    #[error("Error syncing user with Convex: {0}")]
    SyncError(String),
}

#[tauri::command]
pub async fn create_user(
    db: State<'_, DatabaseService>,
    convex: State<'_, ConvexSyncService>,
    user: User,
) -> Result<String, String> {
    let token = db.sign_up(user.clone()).await.map_err(|e| e.to_string());

    if user.is_premium {
        let sync = convex.sync_user(user).await.map_err(|e| e.to_string());

        match sync {
            Ok(_) => {}
            Err(e) => return Err(e),
        }
    }

    match token {
        Ok(token) => Ok(token),
        Err(e) => Err(e),
    }
}

#[tauri::command]
pub async fn sign_in(db: State<'_, DatabaseService>, user: User) -> Result<String, String> {
    db.sign_in(user).await.map_err(|e| e.to_string())
}
