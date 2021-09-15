import * as express from "express";

const router = express.Router();

interface Post {
  user: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

router.get("/", (req, res) => {
  let data = res.locals.posts.find();
  data
    .toArray()
    .then((rst: Post[]) => {
      res.json(rst);
    })
    .catch((err: any) => {
      res.send("fail");
    });
});

router.post("/", (req, res) => {
  res.locals.posts
    .insertOne({
      user: "noname",
      text: "test text",
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .then((rst: any) => {
      console.log(typeof rst.insertedId);
      res.send(`A document was inserted with the _id: ${rst.insertedId}`);
    })
    .catch((err: any) => {
      res.send("post fail");
    });
});

router.patch("/:id", (req, res) => {
  console.log();
  res.locals.posts
    .updateOne(
      { _id: `${res.locals.objectid(req.params.id)}` },
      { $set: { text: "update text", updatedAt: new Date() } }
    )
    .then((rst: any) => {
      console.dir(rst);
      res.send("updated data");
    })
    .catch((err: any) => {
      res.send("update fail");
    });
});

router.delete("/:id", (req, res) => {
  res.locals.posts
    .deleteOne({ _id: req.params.id })
    .then((rst: any) => {
      res.send("delete complete");
    })
    .catch((err: any) => {
      res.send("delete fail");
    });
});

export default router;
