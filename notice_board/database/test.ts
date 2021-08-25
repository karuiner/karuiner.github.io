import { MongoClient } from "mongodb";
const url =
  "mongodb+srv://karuiner:rune8125@cluster0.rj5xw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(url);
client.connect((err) => {
  const col = client.db("sample_training").collection("posts");
  console.log(col);
  client.close();
});
