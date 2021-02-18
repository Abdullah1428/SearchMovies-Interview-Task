const { MongoClient } = require("mongodb");

const config = require("config");

const db = config.get("mongoURI");

const client = new MongoClient(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connectDB = async () => {
  try {
    const db = await client.connect();

    return db;

    //await listDatabases(client);
    //await listCollections("sample_mflix");
  } catch (e) {
    console.error(e);
    return null;
  }
};

/*
async function listDatabases(client) {
  databasesList = await client
    .db()
    .admin()
    .listDatabases();
  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

async function listCollections(db) {
  collections = await client
    .db(db)
    .listCollections()
    .toArray();
  console.log("Collections : ", collections);
}
*/

module.exports = connectDB;
