const router = require("express").Router();
const userController = require("./controllers/userController");
const profileController = require("./controllers/profileController");
const jewelryController = require("./controllers/jewelryController");
const bagController = require("./controllers/bagController");
const addressBookController = require("./controllers/addressBookController");
const wishListController = require("./controllers/wishlistController");
const completeOrderController = require("./controllers/completeOrderController");
const completeTransactionController = require("./controllers/completeTransactionController");
const orderConfirmationController = require("./controllers/orderConfirmationController");

router.use("", jewelryController);
router.use("/users", userController);
router.use("/profiles", profileController);
router.use("/addresses", addressBookController);
router.use("/bag", bagController);
router.use("/wishlist", wishListController);
router.use("/complete-order", completeOrderController);
router.use("/complete-transaction", completeTransactionController);
router.use("/order-confirmation", orderConfirmationController);

module.exports = router;
