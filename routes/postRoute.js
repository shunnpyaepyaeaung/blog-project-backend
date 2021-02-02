const express = require("express");
const {
  createpost,
  likePostByUser,
  unlikePostByUser,
  viewPostLike,
  viewAllPost,
  postDelete,
  likecheck,
} = require("../controllers/postController");

const { checkTokenMiddleware } = require("../middleware/authentication");
const router = express.Router();

router.post("/addpost", checkTokenMiddleware, createpost);

router.get("/like", checkTokenMiddleware, likePostByUser);

router.get("/unlike", checkTokenMiddleware, unlikePostByUser);

router.get("/viewpostlike", viewPostLike);

router.get("/allpost", viewAllPost);

router.delete("/deletepost", checkTokenMiddleware, postDelete);

router.get("/checklike", checkTokenMiddleware, likecheck);
module.exports = router;
