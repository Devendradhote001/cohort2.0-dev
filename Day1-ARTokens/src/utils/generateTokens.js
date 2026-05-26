let jwt = require("jsonwebtoken");

let generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "1m",
  });
};

let generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
