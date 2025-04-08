const router = require("express").Router();
const orderConfirmationManager = require("../managers/orderConfirmationManager");
const addressBookManager = require("../managers/addressBookManager");
const ShoppingBag = require("../models/ShoppingBag");

router.get("/display/:userId", async (req, res) => {
  const userId = req.user._id;

  try {
    const order = await orderConfirmationManager.getOne(userId);

    const address = await addressBookManager.getOne(userId);

    await ShoppingBag.deleteMany({ userID: userId });

    res.status(200).json({ order, address });
  } catch (err) {
    console.log(err.message);
    res.render("500");
  }
});

module.exports = router;
