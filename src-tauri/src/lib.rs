// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

pub mod services;
pub mod commands;
pub mod models;

use crate::commands::{
    create_document, get_document, update_document, delete_document,
    share_document, add_favorite_document, create_user, get_user, update_user, greet
};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub async fn run() {
    tauri::Builder::default()
    .manage(DatabaseService::new().await.expect("Failed to initialize database"))
        .manage(ConvexSyncService::new())
        .plugin(tauri_plugin_deep_link::init())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_single_instance::init(|app, argv, cwd| {
            println!("{}, {argv:?}, {cwd}", app.package_info().name)
        }))
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_window_state::Builder::new().build())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_persisted_scope::init())
        .invoke_handler(tauri::generate_handler![commands])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
