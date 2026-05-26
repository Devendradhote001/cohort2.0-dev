const {
  registerService,
  loginService,
  getAccessTokenService,
} = require("../services/auth.service");

let registerController = async (req, res) => {
  let { accessToken, refreshToken, newUser } = await registerService(req.body);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 10 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.status(201).json({
    message: "USer registered successfully",
    user: newUser,
  });
};

let loginController = async (req, res) => {
  let { accessToken, refreshToken, isExisted } = await loginService(req.body);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    message: "User loggedIn",
    user: isExisted,
  });
};

let getAccessTokenController = async (req, res) => {
  let refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res.status(401).json({
      message: "Unauthorized request",
    });

  let accessToken = await getAccessTokenService(refreshToken);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 10 * 60 * 1000,
  });

  return res.status(200).json({
    message: "Access token generated",
  });
};

module.exports = {
  registerController,
  loginController,
  getAccessTokenController,
};
