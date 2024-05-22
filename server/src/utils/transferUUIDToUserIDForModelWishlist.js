const Wishlist = require("../models/Wishlist");

exports.transferUUIDToUserIDForModelWishlist = async (userId, jewelryIds) => {
  if (jewelryIds) {
    let dataToInsert = [];

    jewelryIds.reduce((acc, curr) => {
      acc = { user: userId, jewelry: curr };
      dataToInsert.push(acc);
      return acc;
    }, {});

    await Wishlist.insertMany(dataToInsert);
  }
};
