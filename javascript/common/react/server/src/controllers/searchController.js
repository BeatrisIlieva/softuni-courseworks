const router = require("express").Router();
const searchManager = require("../managers/searchManager");

router.get("/display/:user", async (req, res) => {
  try {

    const search = req.query.query;

    jewelries = await searchManager.getSearchResults(search);
  
    res.status(200).json(jewelries);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
