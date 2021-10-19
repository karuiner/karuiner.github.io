import * as express from "express";

const router = express.Router();

router.post("/username", (req, res) => {
  let data = res.locals.posts.find(
    {
      user: req.body.keyword,
    },
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
    .then((rst: any[]) => {
      res.json(rst);
    })
    .catch((err: any) => {
      res.send("fail");
    });
});
router.post("/subject", (req, res) => {
  let data = res.locals.posts.find(
    {
      subject: { $regex: req.body.keyword },
    },
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
    .then((rst: any[]) => {
      res.json(rst);
    })
    .catch((err: any) => {
      res.send("fail");
    });
});

router.post("/date", (req, res) => {
  console.log(req.body);
  let data = res.locals.posts.find(
    {
      createdAt: {
        $gte: new Date(req.body.time1 + "T00:00:00Z"),
        $lte: new Date(req.body.time2 + "T23:59:59.999Z"),
      },
    },
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
    .then((rst: any[]) => {
      res.json(rst);
    })
    .catch((err: any) => {
      res.send("fail");
    });
});

export default router;
