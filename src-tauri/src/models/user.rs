use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct User {
    pub email: String,
    pub pass: String,
    pub name: String,
    pub is_premium: bool,
}
