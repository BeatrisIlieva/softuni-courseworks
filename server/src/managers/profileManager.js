const Profile = require("../models/Profile");

exports.create = async (userId) => {
  await Profile.create({
    user: userId,
  });
};

exports.getOne = async (userId) => {
  const profile = await Profile.findOne({
    user: userId,
  }).lean();

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
