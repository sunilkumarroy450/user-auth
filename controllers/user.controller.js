const userModel = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.create_user = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();
    // Generate token for the newly created user
    const token = jwt.sign({ id: user._id, name: user.name }, "SECRET", {
      expiresIn: "7 days",
    });
    return res
      .status(200)
      .send({ user, msg: "User created Successfully", token });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.login_user = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (!existingUser)
      return res.status(404).send({ msg: "User with this email not found" });
    const isPasswordValid = await bcryptjs.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid)
      return res.status(401).send({ msg: "Invalid Password" });
    const token = jwt.sign(
      { id: existingUser._id, name: existingUser.name },
      "SECRET",
      { expiresIn: "7 days" }
    );
    const refreshToken = jwt.sign(
      { id: existingUser._id, name: existingUser.name },
      "REFRESHSECRET",
      {
        expiresIn: "28 days",
      }
    );
    return res
      .status(200)
      .send({ msg: "Login successful", token, refreshToken });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.refresh_token = async (req, res) => {
  try {
    const { refresh_token } = req.headers;
  } catch (error) {
    console.error(error.message);
    return res.status(401).send({ error: "Invalid or expired refresh token" });
  }
};
