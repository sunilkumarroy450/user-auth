const express = require("express");
const { create_user } = require("../controllers/user.controller");

const router = express.Router();

router.post("/", create_user);

module.exports = router;
