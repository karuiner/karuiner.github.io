import { MongoClient } from "mongodb";
import "dotenv/config";
const url = process.env.MONGODB_URL || "";
console.log(url, typeof url);
const client = new MongoClient(url);
client.connect((err) => {
  const col = client.db("sample_training").collection("posts");
  console.log(col);
  client.close();
});
