const { MongoClient } = require("mongodb");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "ecommerce";

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  return "db connected";
}

main().then(console.log).catch(console.error);

app.get("/", async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("users");
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

app.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});
