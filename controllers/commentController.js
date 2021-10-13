const Express = require("express");
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const { CommentModel } = require("../models");

// Post comment
router.post("/create", validateJWT, async (req, res) => {
  const { comment, plantId } = req.body;
  // const plantId = req.params;
  CommentModel.create({
    comment: comment,
    plantId: plantId,
    userId: req.user.id,
  })
    .then((comment) =>
      res.status(201).json({ message: "New Comment", comment })
    )
    .catch((err) =>
      res.status(500).json({ message: "something went wrong at /comment", err })
    );
});

// const query = {
//   where: {
//     id: id,
//     owner: userId,
//   },
// };

// try {
//   let User = await comment.create({

//     comment: DataTypes.TEXT
//   });

router.get("/all", async (req, res) => {
  try {
    const results = await CommentModel.findAll();
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Update Comment

router.put("/update/:commentId", validateJWT, async (req, res) => {
  const userId = req.user.id;
  const commentId = req.params.commentId;
  const { comment, plantId } = req.body;
  const query = {
    where: {
      id: commentId,
      plantId: plantId,
      userId: userId,
    },
  };

  const updateComment = {
    comment: comment,
  };

  try {
    const update = await CommentModel.update(updateComment, query);
    res.status(200).json(update);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Delete

router.delete("/delete/:id", validateJWT, async (req, res) => {
  //res.send("log delete by id called " + req.params.id)
  // const userId = req.user.id;
  const comment = req.params.id;
  try {
    const query = {
      where: {
        // user_Id: userId,
        id: comment,
      },
    };
    await CommentModel.destroy(query);
    res.status(200).json({ message: " Comment Removed" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Get All Comments
router.get("/all", validateJWT, (req, res) => {
  CommentModel.findAll()
    .then((comment) => res.status(200).json(comment))
    .catch((err) => res.status(500).json({ error: err }));
});

// Get My Comments

router.get("/mine", validateJWT, async (req, res) => {
  let { id } = req.user;
  try {
    const myComment = await CommentModel.findAll({
      where: {
        userId: id,
      },
    });
    res.status(200).json(myComment);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
