const bcrypt = require("bcrypt");
const saltRound = 10;

const makeHash = async (plainPassword) => {
  const hashPassword = await bcrypt.hash(plainPassword, saltRound);
  return hashPassword;
};

const checkHash = async (plainPassword, hashPassword) => {
  const checkPassword = await bcrypt.compare(plainPassword, hashPassword);
  return checkPassword;
};

module.exports = { makeHash, checkHash };
