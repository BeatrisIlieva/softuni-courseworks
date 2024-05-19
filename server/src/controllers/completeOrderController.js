const router = require("express").Router();
const addressBookManager = require("../managers/addressBookManager");

router.get("/:userId", async (req, res) => {
  const userId = req.user._id;

  try {
    const profile = await addressBookManager.getOne(userId);

    if (profile) {
      res.status(200).json(profile);
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

router.put("/update/:userId", async (req, res) => {
  const userId = req.user._id;

  profileData = req.body;

  try {
    const address = await addressBookManager.update(userId, profileData);

    res.status(200).json(address);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

module.exports = router;
