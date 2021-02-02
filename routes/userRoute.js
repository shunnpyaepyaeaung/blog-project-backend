const express = require("express");
const {
  userRegister,
  getAUser,
  authUser,
  login,
  allUser,
  deleteUser,
} = require("../controllers/userController");
const { checkTokenMiddleware } = require("../middleware/authentication");

const router = express.Router();

router.post("/register", userRegister);

router.get("/getuser", getAUser);

router.get("/userdetail", checkTokenMiddleware, authUser);

router.post("/login", login);

router.get("/alluser", allUser);

router.delete("/deleteuser", deleteUser);

module.exports = router;
