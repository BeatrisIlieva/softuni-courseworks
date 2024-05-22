const router = require("express").Router();
const wishlistAuthUserManager = require("../managers/wishlistAuthUserManager");
const { setJewelriesLikedAuthUser } = require("../utils/setIsLikedAuthUser");
const {
  setJewelriesLikedNotAuthUser,
} = require("../utils/setIsLikedNotAuthUser");
const Jewelry = require("../models/Jewelry");

router.get("/display/:user", async (req, res) => {
  try {
    const user = req.params.user;
    let jewelries;

    if (!req.user) {
      const ids = req.query.id;
  

      if (ids) {
        let jewelryIds = Array.isArray(ids) ? ids : [ids];
      jewelryIds = jewelryIds.map((id) => Number(id));

      jewelries = await Jewelry.find({
        _id: { $in: jewelryIds },
      });
      jewelries = await setJewelriesLikedNotAuthUser(jewelries, jewelryIds);
      } else {
        jewelries = [];
      }
    } else {
      const userId = req.user._id;

      jewelries = await wishlistAuthUserManager.getAll(userId);
      jewelries = await setJewelriesLikedAuthUser(jewelries, userId);
    }

    res.status(200).json(jewelries);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      message: "Some error",
    });
  }
});

router.post("/create/:jewelryId", async (req, res) => {
  try {
    const jewelryId = req.params.jewelryId;
    const userId = req.user._id;

    const wishlist = await wishlistAuthUserManager.create(userId, jewelryId);

    res.status(200).json({ wishlist });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      message: "Some error",
    });
  }
});

router.post("/delete/:jewelryId", async (req, res) => {
  try {
    const jewelryId = req.params.jewelryId;

    const userId = req.user._id;
    await wishlistAuthUserManager.delete(userId, jewelryId);

    res.status(200).json();
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      message: "Some error",
    });
  }
});

module.exports = router;
