const router = require("express").Router();
const jewelryManager = require("../managers/jewelryManager");
const {
  setJewelriesLikedAuthUser,
} = require("../utils/setIsLikedAuthUser");

router.get("/:categoryId", async (req, res) => {
  try {
    const userId = req.user._id;
    
    let categoryId = req.params.categoryId;

    categoryId = Number(categoryId);

    let jewelries = await jewelryManager.getAll(categoryId);

    jewelries = await setJewelriesLikedAuthUser(jewelries, userId);

    res.status(200).json(jewelries);
  } catch (err) {
    console.log(err.message);

    res.status(400).json({
      message: "Some error",
    });
  }
});

router.get("/:categoryId/:jewelryId", async (req, res) => {
  const jewelryId = req.params.jewelryId;

  try {
    let jewelry = await jewelryManager.getOne(Number(jewelryId));

    res.status(200).json(jewelry);
  } catch (err) {
    console.log(err.message);

    res.status(400).json({
      message: "Some error",
    });
  }
});

module.exports = router;
