use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Document {
    pub id: String,
    pub title: String,
    pub user_id: String,
    pub content: Option<String>,
    pub emoji: Option<String>,
}