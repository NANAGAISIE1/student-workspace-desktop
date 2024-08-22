use std::collections::HashMap;

use crate::models::{Document, User};
use surrealdb::engine::local::{Db, RocksDb};
use surrealdb::opt::auth::Scope;
use surrealdb::{Result, Surreal};

pub struct DatabaseService {
    db: Surreal<Db>,
}

// Helper function to convert User struct into appropriate params for SurrealDB
fn user_params(user: User) -> HashMap<String, String> {
    let mut params = HashMap::new();
    params.insert("email".to_string(), user.email);
    params.insert("pass".to_string(), user.pass);
    params.insert("name".to_string(), user.name);
    // Add more fields if necessary
    params
}

impl DatabaseService {
    pub async fn new() -> Result<Self> {
        let db = Surreal::new::<RocksDb>("student_workspace_db").await?;
        db.use_ns("student_workspace")
            .use_db("student_workspace")
            .await?;
        Ok(Self { db })
    }

    pub async fn sign_up(&self, user: User) -> Result<String> {
        let jwt = self
            .db
            .signup(Scope {
                namespace: "student_workspace",
                database: "student_workspace",
                scope: "user_scope",
                params: &user_params(user.clone()), // Convert user struct to appropriate params
            })
            .await?;

        Ok(jwt.as_insecure_token().to_string())
    }

    pub async fn sign_in(&self, user: User) -> Result<String> {
        let jwt = self
            .db
            .signin(Scope {
                namespace: "student_workspace",
                database: "student_workspace",
                scope: "user_scope",
                params: &user_params(user), // Convert user struct to appropriate params
            })
            .await?;

        Ok(jwt.as_insecure_token().to_string())
    }
}
