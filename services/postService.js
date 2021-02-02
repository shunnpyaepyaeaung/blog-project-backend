const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createPost = async (title, content, userId) => {
  const post = await prisma.post.create({
    data: {
      title,
      content,
      userId,
    },
  });
  return post;
};

const likePost = async (userId, postId) => {
  const like = await prisma.like.create({
    data: {
      userId,
      postId,
    },
  });
  return like;
};

const unlikePost = async (userId, postId) => {
  const unlike = await prisma.like.deleteMany({
    where: {
      userId,
      postId,
    },
  });
  return unlike;
};

const checkLike = async (userId, postId) => {
  const likes = await prisma.like.findMany({
    where: {
      userId,
      postId,
    },
  });
  return likes.length > 0;
};

// checkLike(5, 25).then(console.log);

const viewLikes = async (postid) => {
  const like = await prisma.like.aggregate({
    where: {
      postId: postid,
    },
    count: {
      postId: true,
    },
  });
  return like;
};

const allPost = async () => {
  const post = await prisma.post.findMany({
    orderBy: {
      id: "desc",
    },
    select: {
      id: true,
      title: true,
      content: true,
      User: {
        select: {
          id: true,
          username: true,
        },
      },
      like: true,
    },
  });
  return post;
};

const deletePost = async (postid, userid) => {
  const post = await prisma.post.deleteMany({
    where: {
      id: postid,
      User: {
        id: userid,
      },
    },
  });
  return post;
};

// allPost().then(console.log);
// deletePost(2).then(console.log);

module.exports = {
  createPost,
  likePost,
  unlikePost,
  viewLikes,
  allPost,
  deletePost,
  checkLike,
};

// viewLikes(2).then(console.log);

// createUser("Shunn Pyae", "shunnpyae@gmail.com", "shunn123").then(console.log);
// createUser("Kas", "kas@gmail.com", "kas123").then(console.log);
// createUser("Kaskar", "kaskar@gmail.com", "kaskar123").then(console.log);

// createPostByUser("Happy Chinese New Year", "Happy New Year to you all", 1).then(
//   console.log
// );
// createPostByUser("Cardio Workout", "I can dance like duck", 2).then(
//   console.log
// );

// likePost(5, 25).then(console.log);
// unlikePost(2, 1).then(console.log);

// userDetail(1).then((res) => console.dir(res, { depth: null }));
