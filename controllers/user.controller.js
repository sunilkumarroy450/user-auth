const userModel = require("../models/user.model");
const bcryptjs = require("bcryptjs");

exports.create_user = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();
    return res.status(200).send({ user, msg: "User created Successfully" });
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
    return res
      .status(200)
      .send({ msg: "Login successful", user: existingUser });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};
