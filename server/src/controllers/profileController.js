const router = require("express").Router();
const profileManager = require("../managers/profileManager");


router.post("/edit", async (req, res) => {
  const userId = req.user._id;

  const profileData = req.body;

  try {
    await profileManager.updateProfile(userId, profileData);
    res.json();
  } catch (err) {
    res.status(400).json({
      message: err.message})
      
  }
});

module.exports = router;
