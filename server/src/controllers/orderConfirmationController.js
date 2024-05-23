const router = require("express").Router();
const orderConfirmationManager = require("../managers/orderConfirmationManager");
const addressBookManager = require("../managers/addressBookManager")
const ShoppingBag = require("../models/ShoppingBag");

router.get("/display/:userId", async (req, res) => {
  const userId = req.user._id;
  console.log(`UserId: ${userId}`)

  try {
    const order = await orderConfirmationManager.getOne(userId);
    console.log("odere conf")

    const address = await addressBookManager.getOne(userId);
    console.log(order)
    console.log(address)

    await ShoppingBag.deleteMany({ user: userId });

    res.status(200).json({ order, address});
  } catch (err) {
    console.log(err.message);
    res.render("500");
  }
});

module.exports = router;
