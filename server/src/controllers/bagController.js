const router = require("express").Router();
const bagManager = require("../managers/bagManager");
const {
  DEFAULT_ADD_QUANTITY,
  DEFAULT_MIN_QUANTITY,
} = require("../constants/shoppingBag");
const jewelryManager = require("../managers/jewelryManager");
const shoppingBag = require("../models/ShoppingBag");
const Jewelry = require("../models/Jewelry");
const Inventory = require("../models/Inventory");

router.get("/display/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const jewelries = await bagManager.getAll(userId);

    res.status(200).json({jewelries, DEFAULT_MIN_QUANTITY});
  } catch (err) {
    console.log(err.message);

    res.status(400).json({
      message: "Some error",
    });
  }
});

router.post("/add/:jewelryId", async (req, res) => {
  const userId = req.user._id;

  const jewelryId = Number(req.params.jewelryId);

  try {
    const { size } = req.body;
    let bagItem;
    let sizeId;

    const isAvailable = await Inventory.findOne({
      jewelry: jewelryId,
      size: Number(size),
      quantity: { $gt: 0 },
    });

    if (!size) {
      throw new Error("Ensure you have selected the desired size.");
    } else if (!isAvailable) {
      throw new Error("The jewelry has been sold out.");
    } else {
      sizeId = Number(size);

      bagItem = await bagManager.getOne({
        userId,
        jewelryId,
        sizeId,
      });
    }

    if (!bagItem) {
      await bagManager.create({
        userId,
        jewelryId,
        sizeId,
        quantity: DEFAULT_ADD_QUANTITY,
      });
    } else {
      newQuantity = Number(bagItem.quantity) + DEFAULT_ADD_QUANTITY;
      await shoppingBag.findOneAndUpdate(
        {
          user: userId,
          jewelry: jewelryId,
          size: sizeId,
        },
        { quantity: newQuantity }
      );

      await Inventory.findOneAndUpdate(
        { jewelry: jewelryId, size: sizeId },
        { $inc: { quantity: -1 } },
        { new: true }
      );
    }

    const allBagItems = await shoppingBag.find({ user: userId });

    res.json(allBagItems);
  } catch (err) {
    console.log(err.message);

    res.status(400).json({
      message: "Some error",
    });
  }
});

router.put("/:jewelryId/update", async (req, res) => {
  let { updatedQuantity, bagItemId, sizeId } = req.body;
  sizeId = Number(sizeId);

  try {
    await bagManager.update(bagItemId, updatedQuantity, sizeId);

    res.json();
  } catch (err) {
    res.status(400).json({
      message: err.message})
  }
});

module.exports = router;
