const router = require("express").Router();
const headerManager = require("../managers/headerManager");

router.get("", async (req, res) => {
  try {
    categories = await headerManager.getAll();
    res.status(200).json(categories);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      message: "Some error",
    });
  }
});

module.exports = router;
