const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { DEFAULT_SALT } = require("../constants/password");

const userSchema = new mongoose.Schema({
  _id: {
    type: Number,
    default: 0,
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    minLength: [5, "Email is too short"],
    match: [/^[A-za-z0-9]+@+[a-z]+\.[a-z]+$/, "Invalid email format."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    validate: {
      validator: function (value) {
        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(value);
      },
      message: `Password must contain at least one letter and one digit.`,
    },
    minLength: [8, "Password is too short!"],
  },
  sessionKey: String,
});

userSchema.pre("save", async function () {
  const hash = await bcrypt.hash(this.password, DEFAULT_SALT);

  this.password = hash;
});

userSchema.pre("save", async function () {
  const currentId = await setID();

  this._id = currentId;
});

const user = mongoose.model("User", userSchema);

module.exports = user;

const setID = async () => {
  try {
    let lastObj = await user.findOne().sort({ _id: -1 });

    lastId = lastObj._id;

    nextId = lastId + 1;

    return nextId;
  } catch (err) {
    return 1;
  }
};
