import * as express from "express";

const router = express.Router();

interface Post {
  user: string;
  subject: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Post_l {
  user: string;
  subject: string;
  createdAt: Date;
}

router.get("/", (req, res) => {
  let data = res.locals.posts.find(
    {},
    {
      sort: { createdAt: -1 },
      projection: {
        text: 0,
        updatedAt: 0,
      },
    }
  );
  data
    .toArray()
    .then((rst: Post_l[]) => {
      res.json(rst);
    })
    .catch((err: any) => {
      res.send("fail");
    });
});

router.get("/subject", (req, res) => {
  let data = res.locals.posts.find(
    {},
    {
      sort: { subject: 1, createdAt: -1 },
      projection: {
        text: 0,
        updatedAt: 0,
      },
    }
  );
  data
    .toArray()
    .then((rst: Post_l[]) => {
      res.json(rst);
    })
    .catch((err: any) => {
      res.send("fail");
    });
});

router.get("/user", (req, res) => {
  let data = res.locals.posts.find(
    {},
    {
      sort: { user: 1, createdAt: -1 },
      projection: {
        text: 0,
        updatedAt: 0,
      },
    }
  );
  data
    .toArray()
    .then((rst: Post_l[]) => {
      res.json(rst);
    })
    .catch((err: any) => {
      res.send("fail");
    });
});

router.get("/:id", (req, res) => {
  res.locals.posts
    .findOne({
      _id: res.locals.objectid(req.params.id),
    })
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
  res.locals.posts
    .updateOne(
      { _id: res.locals.objectid(req.params.id) },
      { $set: { text: "update text", updatedAt: new Date() } }
    )
    .then((rst: any) => {
      res.send("updated data");
    })
    .catch((err: any) => {
      res.send("update fail");
    });
});

router.delete("/:id", (req, res) => {
  res.locals.posts
    .deleteOne({ _id: res.locals.objectid(req.params.id) })
    .then((rst: any) => {
      res.send("delete complete");
    })
    .catch((err: any) => {
      res.send("delete fail");
    });
});

export default router;
