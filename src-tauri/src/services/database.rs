use crate::models::{Document, SharedDocument, FavoriteDocument, User};
use surrealdb::Datastore;
use surrealdb::sql::Value;
use anyhow::Result;

pub struct DatabaseService {
    ds: Datastore,
}

impl DatabaseService {
    pub async fn new() -> Result<Self> {
        let ds = Datastore::new("file://data.db").await?;
        Ok(Self { ds })
    }

    pub async fn create_document(&self, document: &Document) -> Result<String> {
        let sql = "CREATE document CONTENT $data RETURN id";
        let vars = surrealdb::sql::Object::from(document);
        let res = self.ds.execute(sql, &vars, false).await?;
        let id = res[0].result?.first().as_string()?;
        Ok(id)
    }

    pub async fn get_document(&self, id: &str) -> Result<Option<Document>> {
        let sql = "SELECT * FROM document WHERE id = $id";
        let vars = surrealdb::sql::Object::from([("id", id)]);
        let res = self.ds.execute(sql, &vars, false).await?;
        let doc = res[0].result?.first().as_object()?;
        Ok(doc.map(|d| serde_json::from_value(d.clone()).unwrap()))
    }

    pub async fn update_document(&self, document: &Document) -> Result<()> {
        let sql = "UPDATE document SET * = $data WHERE id = $id";
        let mut vars = surrealdb::sql::Object::from(document);
        vars.insert("id".into(), document.id.clone().into());
        self.ds.execute(sql, &vars, false).await?;
        Ok(())
    }

    pub async fn delete_document(&self, id: &str) -> Result<()> {
        let sql = "DELETE FROM document WHERE id = $id";
        let vars = surrealdb::sql::Object::from([("id", id)]);
        self.ds.execute(sql, &vars, false).await?;
        Ok(())
    }

    // Implement similar methods for SharedDocument, FavoriteDocument, and User
    // ...
}