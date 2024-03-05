const { Router } = require("express");
const userRouter = require("./user.routes");

module.exports = Router().use("/user", userRouter);
