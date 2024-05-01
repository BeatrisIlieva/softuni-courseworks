const router = require("express").Router();
const userController = require("./controllers/userController");
const jewelryController = require("./controllers/jewelryController");

router.use("", jewelryController);
router.use("/users", userController);

module.exports = router;
