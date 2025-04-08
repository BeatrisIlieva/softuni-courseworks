const mongoose = require("mongoose");
const {
  FIRST_NAME_MAX_LENGTH,
  FIRST_NAME_MIN_LENGTH,
  FIRST_NAME_MAX_LENGTH_ERROR_MESSAGE,
  FIRST_NAME_MIN_LENGTH_ERROR_MESSAGE,
  LAST_NAME_MAX_LENGTH,
  LAST_NAME_MIN_LENGTH,
  LAST_NAME_MAX_LENGTH_ERROR_MESSAGE,
  LAST_NAME_MIN_LENGTH_ERROR_MESSAGE,
  ONLY_LETTERS_FIRST_NAME_EXCEPTION_MESSAGE,
  ONLY_LETTERS_LAST_NAME_EXCEPTION_MESSAGE,
} = require("../constants/profile");

const profileSchema = new mongoose.Schema({
  user: {
    type: Number,
    ref: "User",
    required: true,
  },
  firstName: {
    type: String,
    // required: [true, "First name is required!"],
    minLength: [FIRST_NAME_MIN_LENGTH, FIRST_NAME_MIN_LENGTH_ERROR_MESSAGE],
    maxLength: [FIRST_NAME_MAX_LENGTH, FIRST_NAME_MAX_LENGTH_ERROR_MESSAGE],
    match: [/^[A-za-z]+$/, ONLY_LETTERS_FIRST_NAME_EXCEPTION_MESSAGE],
  },
  lastName: {
    type: String,
    // required: [true, "Last name is required!"],
    minLength: [LAST_NAME_MIN_LENGTH, LAST_NAME_MIN_LENGTH_ERROR_MESSAGE],
    maxLength: [LAST_NAME_MAX_LENGTH, LAST_NAME_MAX_LENGTH_ERROR_MESSAGE],
    match: [/^[A-za-z]+$/, ONLY_LETTERS_LAST_NAME_EXCEPTION_MESSAGE],
  }, 
  birthday: {
    type:String,
    match: [/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/, "Please enter a valid date"],
  },
  specialDay: {
    type:String,
    match: [/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/, "Please enter a valid date"],
  }
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
