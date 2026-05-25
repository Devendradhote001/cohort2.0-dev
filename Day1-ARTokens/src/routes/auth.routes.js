let express = require("express");
const {
  registerController,
  loginController,
  getAccessTokenController,
} = require("../controllers/auth.controller");

let router = express.Router();

router.get("/get-accessToken", getAccessTokenController);

router.post("/register", registerController);
router.post("/login", loginController);

module.exports = router;
