const jwt = require("jsonwebtoken");

const checkTokenMiddleware = (req, res, next) => {
  let token = req.headers.token;
  try {
    let decoded = jwt.verify(token, "mytopsecret");
    req.userid = decoded.data;
    next();
  } catch (err) {
    res.status(403).json("You are not allow to post!");
  }
};

module.exports = { checkTokenMiddleware };
