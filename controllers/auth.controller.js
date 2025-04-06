import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcryptjs.hash(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });
  console.log("hitting signUp route");
  try {
    await newUser.save();
    res.status(201).json({ message: "user created successfully" }); // Removed token from signup response
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  console.log("signup hitting ");

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(errorHandler(404, "user not fount try with valid email"));
    }
    const isValid = await bcryptjs.compare(password, user.password);
    if (!isValid) {
      return next(errorHandler(404, "wrond password Try again"));
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = user._doc;

    res.status(200).json({ ...rest, access_token: token }); // Send token in the JSON response
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  console.log("hit google");
  const { name, email, photo } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res.status(200).json({ ...rest, access_token: token }); // Send token in the JSON response
    } else {
      const generatedPassward = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcryptjs.hash(generatedPassward, 10);
      const newUser = new User({
        username:
          name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-2),
        email,
        password: hashedPassword,
        avatar: photo,
      });

      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res.status(200).json({ ...rest, access_token: token }); // Send token in the JSON response
    }
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  res.status(200).json({ message: "user has been logged out" }); // No need to clear cookie
};
