const router = require("express").Router();
const userController = require("./controllers/userController");
const profileController = require("./controllers/profileController");
const jewelryController = require("./controllers/jewelryController");
const bagController = require("./controllers/bagController");

router.use("", jewelryController);
router.use("/users", userController);
router.use("/profiles", profileController);
router.use("/bag", bagController);

module.exports = router;
