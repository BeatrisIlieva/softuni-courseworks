const router = require("express").Router();

const jewelryManager = require("../managers/jewelryManager");

const Jewelry = require("../models/Jewelry");

router.get("/:categoryId", async (req, res) => {
  try {
    let categoryId = req.params.categoryId;
    categoryId = Number(categoryId);
    console.log(`"Cat": ${categoryId}`)
    jewelries = await jewelryManager.getAll(categoryId);
    // jewelries = await Jewelry.find();
    res.status(200).json(jewelries);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      message: "Some error",
    });
  }
});

// router.get("/:categoryId", async (req, res) => {
//   try {
//     const category = req.params.categoryId;
//     const categoryId = Number(category);

//     jewelries = await Jewelry.find({category: categoryId});
//     // jewelries = await jewelryManager.getAll(categoryId);
//     res.status(200).json({jewelries});
//   } catch (err) {
//     console.log(err.message);
//     res.status(400).json({
//       message: "Some error",
//     });
//   }
// });

module.exports = router;
