const router = require("express").Router();
const headerController = require("./controllers/headerController");
const userController = require("./controllers/userController");
const jewelryController = require("./controllers/jewelryController");

router.use("", headerController);
router.use("/users", userController);
router.use("/jewelries", jewelryController);


module.exports = router;