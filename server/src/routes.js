const router = require("express").Router();
const userController = require("./controllers/userController");
const profileController = require("./controllers/profileController");
const jewelryController = require("./controllers/jewelryController");

router.use("", jewelryController);
router.use("/users", userController);
router.use("/profiles", profileController);

module.exports = router;
