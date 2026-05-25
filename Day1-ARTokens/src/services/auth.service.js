const UserModel = require("../models/user.model");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateTokens");

let registerService = async (data) => {
  try {
    let { name, email, password } = data;

    if (!email || !password) throw new Error("all fields are required");

    let isExisted = await UserModel.findOne({
      email,
    });

    if (isExisted) throw new Error("User already exists with this email");

    let hashPass = bcrypt.hashSync(password, 10);

    let newUser = await UserModel.create({
      name,
      email,
      password: hashPass,
    });

    let accessToken = generateAccessToken(newUser._id);
    let refreshToken = generateRefreshToken(newUser._id);

    newUser.refreshToken = refreshToken;
    await newUser.save();

    return {
      accessToken,
      refreshToken,
      newUser,
    };
  } catch (error) {
    throw new Error(error);
  }
};

let loginService = async (data) => {
  try {
    let { email, password } = data;

    if (!email || !password)
      return res.status(400).json({
        message: "All fields are required",
      });

    let isExisted = await UserModel.findOne({
      email,
    });

    if (!isExisted)
      return res.status(404).json({
        message: "User not found",
      });

    let hashPass = await bcrypt.compare(password, isExisted.password);

    if (!hashPass)
      return res.status(401).json({
        message: "Invalid credentials",
      });

    let accessToken = generateAccessToken(isExisted._id);
    let refreshToken = generateRefreshToken(isExisted._id);

    isExisted.refreshToken = refreshToken;
    await isExisted.save();

    return {
      accessToken,
      refreshToken,
      isExisted,
    };
  } catch (error) {
    throw new Error(error);
  }
};

let getAccessTokenService = async (refreshToken) => {
  let decode = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

  if (!decode) throw new Error("unauthorized");

  let user = await UserModel.findById(decode.id);

  if (refreshToken !== user.refreshToken) throw new Error("unauthorized");

  let accessToken = generateAccessToken(user._id);

  return accessToken;
};

module.exports = {
  registerService,
  loginService,
  getAccessTokenService,
};
