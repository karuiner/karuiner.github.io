import { MongoClient } from "mongodb";
import "dotenv/config";
const url = process.env.MONGODB_URL || "";
console.log(url, typeof url);
const client = new MongoClient(url);

interface Post {
  user: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}
// client.connect(async (err) => {
//   const db = client.db("test");
//   const posts = db.collection<Post>("posts");
//   const result = await posts.deleteMany({});
//   console.log("Deleted " + result.deletedCount + " documents");
// });

client.connect(async (err) => {
  const db = client.db("test");
  const posts = db.collection<Post>("posts");
  const result = await posts.insertOne({
    user: "noname",
    text: "test text",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  console.log(`A document was inserted with the _id: ${result.insertedId}`);
  let data = await posts.findOne({ _id: result.insertedId });
  console.dir(data);
  const update = await posts.updateOne(
    { _id: result.insertedId },
    { $set: { text: "update text", updatedAt: new Date() } }
  );
  console.log(
    `${update.matchedCount} document(s) matched the filter, updated ${update.modifiedCount} document(s)`
  );
  data = await posts.findOne({ _id: result.insertedId });
  console.dir(data);

  const del = await posts.deleteOne({ _id: result.insertedId });
  console.log("Deleted " + del.deletedCount + " documents");
  await client.close();
});

// client.connect((err) => {
//   const col = client.db("sample_training").collection("posts");
//   col
//     .findOne({ author: "machine" })
//     .then((rst) => {
//       console.log(rst);
//     })
//     .finally(() => {
//       client.close();
//     });
// });

// async function run() {
//   try {
//     await client.connect();
//     const database = client.db("sample_mflix");
//     const movies = database.collection("movies");
//     // Query for a movie that has the title 'The Room'
//     const query = { title: "The Room" };
//     const options = {
//       // Include only the `title` and `imdb` fields in the returned document
//       projection: { _id: 0, title: 1, imdb: 1 },
//     };
//     const movie = await movies.findOne(query, options);
//     // since this method returns the matched document, not a cursor, print it directly
//     console.log(movie);
//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.dir);
