import { MongoClient } from "mongodb";
import "dotenv/config";
const url = process.env.MONGODB_URL || "";
console.log(url, typeof url);
const client = new MongoClient(url);
client.connect((err) => {
  const col = client.db("sample_training").collection("posts");
  col
    .findOne({ author: "machine" })
    .then((rst) => {
      console.log(rst);
    })
    .finally(() => {
      client.close();
    });
});

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
