import express from "express";
import * as bodyParser from "body-parser";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import "dotenv/config";
import text from "./comp/text";
import search from "./comp/search";

interface Post {
  user: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}
const url = process.env.MONGODB_URL || "";
const client = new MongoClient(url);
client
  .connect()
  .then(async (connection) => {
    const app = express();
    app.use(bodyParser.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
    app.use("/", (req, res, next) => {
      res.locals.db = client.db("test");
      res.locals.objectid = ObjectId;
      res.locals.posts = client.db("test").collection<Post>("posts");
      next();
    });
    app.use("/text", text);
    app.use("/search", search);

    app.listen(process.env.APP_PORT, () => {
      console.log("server running");
    });
  })
  .catch((error) => console.log(error));
