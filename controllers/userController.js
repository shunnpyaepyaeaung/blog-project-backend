const jwt = require("jsonwebtoken");
const {
  createUser,
  getUser,
  userDetail,
  getUserByName,
  getAllUser,
  deleteuser,
} = require("../services/userService");
const { makeHash, checkHash } = require("../utils/bcrypt");

const userRegister = async (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let hashPassword = await makeHash(password);
  let user = await createUser(username, email, hashPassword);
  res.json(user);
};

const getAUser = async (req, res) => {
  let userid = +req.query.userid;
  let user = await getUser(userid);
  res.json(user);
};

const allUser = async (req, res) => {
  let user = await getAllUser();
  res.json(user);
};

const deleteUser = async (req, res) => {
  let userid = +req.query.userid;
  let user = await deleteuser(userid);
  res.json(user);
};

const authUser = async (req, res) => {
  let userid = req.userid;
  let user = await userDetail(userid);
  res.json(user);
};

const login = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let dbuser = (await getUserByName(username)) || [];
  if (dbuser.length === 0) {
    res.status(403).json({
      error: "Incorrect username or password",
    });
    return;
  }
  let dbpassword = dbuser.password;
  let checkPassword = await checkHash(password, dbpassword);
  if (checkPassword) {
    let token = jwt.sign(
      {
        data: dbuser.id,
      },
      "mytopsecret",
      { expiresIn: "1h" }
    );
    res.json({ token });
  } else {
    res.status(403).json({
      error: "Incorrect username or password",
    });
  }
};

module.exports = {
  userRegister,
  getAUser,
  authUser,
  allUser,
  login,
  deleteUser,
};
