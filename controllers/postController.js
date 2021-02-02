const {
  createPost,
  likePost,
  unlikePost,
  viewLikes,
  allPost,
  deletePost,
  checkLike,
} = require("../services/postService");

const createpost = async (req, res) => {
  let title = req.body.title;
  let content = req.body.content;
  let userid = req.userid;
  try {
    const post = await createPost(title, content, userid);
    res.json(post);
  } catch (err) {
    res.json({
      message: "Something wrong",
    });
  }
};

const likePostByUser = async (req, res) => {
  let userid = req.userid;
  let postid = +req.query.postid;
  let like = await likePost(userid, postid);
  res.json(like);
};

const unlikePostByUser = async (req, res) => {
  let userid = req.userid;
  let postid = +req.query.postid;
  let unlike = await unlikePost(userid, postid);
  res.json(unlike);
};

const likecheck = async (req, res) => {
  let userid = req.userid;
  let postid = +req.query.postid;
  let check = await checkLike(userid, postid);
  res.json(check);
};

const viewPostLike = async (req, res) => {
  let postid = +req.query.postid;
  let checkLike = await viewLikes(postid);
  res.json(checkLike);
};

const viewAllPost = async (req, res) => {
  let post = await allPost();
  res.json(post);
};

const postDelete = async (req, res) => {
  let postid = +req.query.postid;
  let userid = req.userid;
  let post = await deletePost(postid, userid);
  res.json(post);
};

// viewAllPost().then(console.log);

module.exports = {
  createpost,
  likePostByUser,
  unlikePostByUser,
  viewPostLike,
  viewAllPost,
  postDelete,
  likecheck,
};
