const router = require("express").Router();
const profileManager = require("../managers/profileManager");


router.get("/get-personal-details", async (req, res) => {
  const userId = req.user._id;
  console.log("Here auto")

  try {
    const data = await profileManager.findOne({user: userId});
    res.json(data);
  } catch (err) {
    res.status(400).json({
      message: err.message})
      
  }
});

router.put("/edit-personal-details", async (req, res) => {
  const userId = req.user._id;

  const profileData = req.body;

  try {
    const data  =await profileManager.updateProfile(userId, profileData);
    res.json(data);
  } catch (err) {
    res.status(400).json({
      message: err.message})
      
  }
}) 



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
