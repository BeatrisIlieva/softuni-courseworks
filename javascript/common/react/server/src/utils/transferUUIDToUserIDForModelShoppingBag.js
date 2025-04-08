const ShoppingBag = require("../models/ShoppingBag");

exports.transferUUIDToUserIDForModelShoppingBag = async (userUUID, userId) => {
  await ShoppingBag.updateMany(
    { userUUID: userUUID, userID: null },
    { $set: { userID: userId } }
  );
};
