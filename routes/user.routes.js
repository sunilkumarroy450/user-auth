const express = require("express");
const {
  create_user,
  login_user,
  refresh_token,
} = require("../controllers/user.controller");

const router = express.Router();

router.post("/", create_user);
router.post("/login", login_user);
router.post("/refresh", refresh_token);

module.exports = router;
