const bcrypt = require("bcrypt");
const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User is already exists, you can login.",
        success: false,
      });
    }
    const userModel = new UserModel({
      name,
      email,
      password,
    });
    userModel.password = await bcrypt.hash(password, 10);
    userModel.save();
    res.status(201).json({ message: "SignUp Successfully!", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!", success: false });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const errorMessage = "Email and Password is wrong!.";
    if (!user) {
      return res.status(403).json({
        message: errorMessage,
        success: false,
      });
    }

    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({
        message: errorMessage,
        success: false,
      });
    }
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "48h" }
    );
    res
      .status(200)
      .json({
        message: "Login Success!",
        success: true,
        jwtToken,
        email,
        name: user.name,
      });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!", success: false });
  }
};

module.exports = {
  signUp,
  login
};
