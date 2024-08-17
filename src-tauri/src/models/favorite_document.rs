use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct FavoriteDocument {
    pub id: String,
    pub document_id: String,
    pub user_id: String,
}