const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createUser = async (username, email, password) => {
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password,
    },
  });
  return user;
};

const getUser = async (userid) => {
  const user = await prisma.user.findFirst({
    where: {
      id: userid,
    },
    select: {
      username: true,
      email: true,
    },
  });
  return user;
};

const getAllUser = async () => {
  const user = await prisma.user.findMany();
  return user;
};

const deleteuser = async (userid) => {
  const user = await prisma.user.delete({
    where: {
      id: userid,
    },
  });
  return user;
};

const getUserByName = async (username) => {
  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  });
  return user;
};

const userDetail = async (userid) => {
  const user = await prisma.user.findMany({
    where: {
      id: userid,
    },
    select: {
      id: true,
      username: true,
      email: true,
      post: {
        select: {
          id: true,
          title: true,
          content: true,
        },
      },
    },
  });
  return user;
};

// userDetail(7).then(console.log);

module.exports = {
  createUser,
  getUser,
  userDetail,
  getUserByName,
  getAllUser,
  deleteuser,
};
