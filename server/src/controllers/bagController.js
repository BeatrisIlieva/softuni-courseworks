const router = require("express").Router();
const bagManager = require("../managers/bagManager");
const {
  DEFAULT_ADD_QUANTITY,
  DEFAULT_MIN_QUANTITY,
} = require("../constants/shoppingBag");
const jewelryManager = require("../managers/jewelryManager");
const shoppingBag = require("../models/ShoppingBag");

router.get("/", async (req, res) => {
  try {
    const userId = req.user._id;

    const jewelries = await bagManager.getAll(userId);

    res.status(200).json(jewelries, DEFAULT_MIN_QUANTITY);
  } catch (err) {
    console.log(err.message);

    res.status(400).json({
      message: "Some error",
    });
  }
});

router.post("/:jewelryId", async (req, res) => {
  const userId = req.user._id;
  // console.log(userId); 

  console.log("here");
  console.log(req.body);

  const jewelryId = Number(req.params.jewelryId);

  try {
    const { size } = req.body;
    let bagItem;
    let sizeId;

    if (!size) {
      throw new Error("Ensure you have selected the desired size.");
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
    }

    res.json();
  } catch (err) {
    console.log(err.message);

    res.status(400).json({
      message: "Some error",
    });
  }
});

// router.post("/:jewelryId/update", async (req, res) => {
//   let { updatedQuantity, bagItemId, sizeId } = req.body;
//   sizeId = Number(sizeId);

//   try {
//     await bagManager.update(bagItemId, updatedQuantity, sizeId);

//     res.redirect("/bag");
//   } catch (err) {
//     const errorMessages = extractErrorMessages(err);
//     req.session.errorMessages = errorMessages; // Store error messages in session
//     res.redirect("/bag");
//     // const errorMessages = extractErrorMessages(err);

//     // const queryParams = new URLSearchParams({
//     //   errorMessages: JSON.stringify(errorMessages),
//     // });
//     // res.redirect(`/bag?${queryParams.toString()}`);
//   }
// });

module.exports = router;
