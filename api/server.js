const express = require("express");

const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

const config = require("config");

const dataBase = config.get("database");

const ObjectId = require("mongodb").ObjectID;

// connection to database only once
let db;

connectDB()
  .then(res => {
    db = res;
  })
  .catch(err => {
    console.log("Err ::", err);
    db = null;
  });

app.use(cors());

// init middleware
app.use(express.json({ extended: false }));

// get movies data api general
app.get("/api/movies", (req, res) => {
  if (!db) {
    return res.status(400).send("No Database Found");
  }

  const database = db.db(dataBase);

  const collection = database.collection("movies");

  collection
    .find({})
    .limit(50)
    .toArray((error, result) => {
      if (error) {
        return res.status(500).send(error);
      }

      res.send(result);
    });
});

// get movies data by id
app.get("/api/movies/:id", (req, res) => {
  if (!db) {
    return res.status(400).send("No Database Found");
  }

  const database = db.db(dataBase);

  const collection = database.collection("movies");

  collection.findOne({ _id: new ObjectId(req.params.id) }, (error, result) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.send(result);
  });
});

//  get comments for specific video
app.get("/api/comments/:id", (req, res) => {
  if (!db) {
    return res.status(400).send("No Database Found");
  }

  const database = db.db(dataBase);

  const collection = database.collection("comments");

  collection
    .find({ movie_id: new ObjectId(req.params.id) })
    .toArray((error, result) => {
      if (error) {
        return res.status(500).send(error);
      }
      res.send(result);
    });
});

// port for listening
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
