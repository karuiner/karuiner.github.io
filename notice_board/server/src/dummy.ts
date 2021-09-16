import { MongoClient } from "mongodb";
import "dotenv/config";
const url = process.env.MONGODB_URL || "";
console.log(url, typeof url);
const client = new MongoClient(url);

interface Post {
  user: string;
  subject: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

client.connect(async (err) => {
  const db = client.db("test");
  const posts = db.collection<Post>("posts");
  let users = ["user1", "user2", "user3", "user4"];
  let data: Post[] = [];
  for (let i = 0; i < 123; i++) {
    let k = Math.floor(Math.random() * 4);
    data.push({
      user: users[k === 4 ? 3 : k],
      text: `main text ${i}`,
      subject: `subject ${i}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  const result = await posts.insertMany(data);
});
