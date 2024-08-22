pub mod commands;
pub mod models;
pub mod services;

use services::{ConvexSyncService, DatabaseService};

use crate::commands::{create_user, sign_in};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // Initialize async resources before running the Tauri app
    tauri::async_runtime::block_on(async {
        let db_service = DatabaseService::new()
            .await
            .expect("Failed to initialize database");

        tauri::Builder::default()
            .manage(db_service)
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
            .invoke_handler(tauri::generate_handler![create_user, sign_in])
            .run(tauri::generate_context!())
            .expect("error while running tauri application");
    });
}
