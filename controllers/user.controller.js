const userModel = require("../models/user.model");

exports.create_user = async (req, res) => {
  try {
    const user = new userModel({ ...req.body });
    await user.save();
    return res.status(200).send({ user, msg: "User created Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error });
  }
};
