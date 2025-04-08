const Profile = require("../models/Profile");

exports.create = async (userId, firstName, lastName) => {
  await Profile.create({
    user: userId,
    firstName,
    lastName
  });
};

exports.getOne = async (userId) => {
  const profile = await Profile.findOne({
    user: userId,
  });

  return profile;
};

exports.update = async (userId, profileData) => {
   const profile = await Profile.findOneAndUpdate(
    { user: userId },
    profileData,
    { runValidators: true, new: true }
  );
  return profile;
};
