import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { errorhandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcryptjs.hash(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });
  console.log("hiting signUp route");
  try {
    await newUser.save();
    res.status(201).json("user created successfully");
  } catch (error) {
    next();
  }
};

export const sinin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorhandler(404, "user not fount try with valid email"));
    }
    const isValid = await bcryptjs.compare(password, user.password);
    if (!isValid) {
      return next(errorhandler(404, "wrond password Try again"));
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    console.log(token);

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(user);
  } catch (error) {
    next(error);
  }
};
