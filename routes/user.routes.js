const express = require("express");
const { create_user, login_user } = require("../controllers/user.controller");

const router = express.Router();

router.post("/", create_user);
router.post("/login", login_user);

module.exports = router;
