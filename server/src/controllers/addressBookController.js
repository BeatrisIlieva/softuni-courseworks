const router = require("express").Router();
const addressBookManager = require("../managers/addressBookManager");


router.get("/display/:userId", async (req, res) => {
  const userId = req.user._id;

  try {
    const data = await addressBookManager.getOne(userId);
    console.log(data)
    res.json(data);
  } catch (err) {
    res.status(400).json({
      message: err.message})
      
  }
});

router.put("/edit/:userId", async (req, res) => {
  const userId = req.user._id;

  const addressData = req.body;

  try {
    const data  =await addressBookManager.update(userId, addressData);
    res.json(data);
  } catch (err) {
    res.status(400).json({
      message: err.message})
      
  }
}) 


module.exports = router;
