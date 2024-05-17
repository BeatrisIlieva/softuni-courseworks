const router = require("express").Router();
const wishlistAuthUserManager = require("../managers/wishlistAuthUserManager");

router.get("/", async (req, res) => {
  try {
    let userId;
    let jewelries;

    if (!req.user) {
      jewelries = await wishlistNotAuthUserManager.getAll(req);
    } else {
      userId = req.user._id;

      jewelries = await wishlistAuthUserManager.getAll(userId);
    }
    res.render("wishlist/wishlist", { jewelries });
  } catch (err) {
    console.log(err.message);
    res.render("500");
  }
});

router.post("/create/:jewelryId", async (req, res) => {
  try {
    const jewelryId = req.params.jewelryId;
    const userId = req.user._id;

    const wishlist = await wishlistAuthUserManager.create(userId, jewelryId);

    res.status(200).json({wishlist});
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
    

    res.status(200).json({wishlist});
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      message: "Some error",
    });
  }
});

module.exports = router;
