const router = require("express").Router();
const profileManager = require("../managers/profileManager");


router.get("/display/:userId", async (req, res) => {

  const userId = req.user._id;

  try {
    const data = await profileManager.getOne(userId);

    res.json(data);
  } catch (err) {
    res.status(400).json({
      message: err.message})
      
  }
});

router.put("/edit/:userId", async (req, res) => {
  const userId = req.user._id;

  const profileData = req.body;

  try {
    const data  =await profileManager.update(userId, profileData);
    res.json(data);
  } catch (err) {
    res.status(400).json({
      message: err.message})
      
  }
}) 

module.exports = router;
