const AddressBook = require("../models/AddressBook");

exports.create = async (userId) => {
  await AddressBook.create({
    user: userId,
  });
};

exports.getOne = async (userId) => {
  const address = await AddressBook.findOne({
    user: userId,
  });

  return address;
};

exports.update = async (userId, addressData) => {
   const address = await AddressBook.findOneAndUpdate(
    { user: userId },
    addressData,
    { runValidators: true, new: true }
  );
  return address;
};
