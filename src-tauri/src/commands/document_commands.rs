
// #[tauri::command]
// pub async fn create_document(
//     db: State<'_, DatabaseService>,
//     convex: State<'_, ConvexSyncService>,
//     user_id: String,
//     title: String,
//     is_premium: bool,
// ) -> Result<String, String> {
//     let document = Document {
//         id: String::new(), // Will be generated by the database
//         title,
//         user_id,
//         content: None,
//         emoji: None,
//     };

//     let id = db.create_document(&document).await.map_err(|e| e.to_string())?;

//     if is_premium {
//         convex.sync_document(&document).await.map_err(|e| e.to_string())?;
//     }

//     Ok(id)
// }

// #[tauri::command]
// pub async fn get_document(
//     db: State<'_, DatabaseService>,
//     id: String,
// ) -> Result<Option<Document>, String> {
//     db.get_document(&id).await.map_err(|e| e.to_string())
// }

// #[tauri::command]
// pub async fn update_document(
//     db: State<'_, DatabaseService>,
//     convex: State<'_, ConvexSyncService>,
//     document: Document,
//     is_premium: bool,
// ) -> Result<(), String> {
//     db.update_document(&document).await.map_err(|e| e.to_string())?;

//     if is_premium {
//         convex.sync_document(&document).await.map_err(|e| e.to_string())?;
//     }

//     Ok(())
// }

// #[tauri::command]
// pub async fn delete_document(
//     db: State<'_, DatabaseService>,
//     convex: State<'_, ConvexSyncService>,
//     id: String,
//     is_premium: bool,
// ) -> Result<(), String> {
//     db.delete_document(&id).await.map_err(|e| e.to_string())?;

//     if is_premium {
//         // Assuming we need to delete from Convex as well
//         convex.delete_document(&id).await.map_err(|e| e.to_string())?;
//     }

//     Ok(())
// }
