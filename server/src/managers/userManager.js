const bcrypt = require("bcrypt");
const jwt = require("../lib/jwt");
const User = require("../models/User");
const profileManager = require("./profileManager");
const { SECRET } = require("../config/config");
const Profile = require("../models/Profile");
const addressManager = require("./addressBookManager");

exports.register = async (userData) => {
  const user = await User.findOne({ email: userData.email });

  if (user) {
    throw new Error("Email already exists!");
  }

  const createdUser = await User.create(userData);

  const userId = createdUser._id;

  const token = await generateToken(createdUser);

  const firstName = userData.firstName;

  const lastName = userData.lastName;

  await profileManager.create(createdUser._id, firstName, lastName);

  await addressManager.create(createdUser._id, firstName, lastName);

  return { token, userId };
};

exports.login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Cannot find email or password!");
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error("Cannot find email or password!");
  }

  const token = await generateToken(user);

  return { token, user };
};

async function generateToken(user) {
  const payload = {
    _id: user._id,
    email: user.email,
  };

  const token = await jwt.sign(payload, SECRET, { expiresIn: "7d" });

  // return token;
  const result = {
    _id: user._id,
    email: user.email,
    accessToken: token,
  };

  return result;
}

exports.changeEmail = async (email, password, userId) => {
  user = await User.findById(userId);

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Ensure you enter a valid password.");
  } else {
    await User.findByIdAndUpdate(userId, { email: email });
  }
};

exports.changePassword = async (
  oldPassword,
  password,
  repeatPassword,
  userId
) => {
  user = await User.findById(userId);

  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

  if (!isPasswordValid) {
    throw new Error("Ensure you enter a valid password.");
  } else {
    user.password = password;
    user.repeatPassword = repeatPassword;
    await user.save();
  }
};

exports.delete = async (userId) => {
  await Profile.deleteOne({ user: userId });
  await User.findByIdAndDelete(userId);
};
