import { MongoClient } from "mongodb";
import "dotenv/config";
const url = process.env.MONGODB_URL || "";
console.log(url, typeof url);
const client = new MongoClient(url);

interface Post {
  no: number;
  user: string;
  subject: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}
interface Post2 {
  _id: any;
  user: string;
  subject: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}
// 데이터 입력
// client.connect(async (err) => {
//   const db = client.db("test");
//   const posts = db.collection<Post>("posts");
//   let users = ["user1", "user2", "user3", "user4"];
//   let data: Post[] = [];
//   let time = Date.now();
//   for (let i = 0; i < 123; i++) {
//     let k = Math.floor(Math.random() * 4);
//     time += (Math.random() * 24 * 60 + 1) * 60000;
//     data.push({
//       no: i + 1,
//       user: users[k === 4 ? 3 : k],
//       text: `main text ${i}`,
//       subject: `subject ${i}`,
//       createdAt: new Date(time),
//       updatedAt: new Date(time),
//     });
//   }

//   const result = await posts.insertMany(data);
// });

// data 수정
client.connect(async (err) => {
  const db = client.db("test");
  const posts = db.collection<Post2>("posts");
  let data = await posts.find({}).toArray();
  //  console.dir(data);
  data.map(async (x, i) => {
    await posts.updateOne({ _id: x._id }, { $set: { no: i + 1 } });
  });
  data = await posts.find({}).toArray();
  console.dir(data);
});
