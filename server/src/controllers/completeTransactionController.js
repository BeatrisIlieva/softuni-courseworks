const router = require("express").Router();
const completeTransactionManager = require("../managers/completeTransactionManager");
const orderConfirmationManager = require("../managers/orderConfirmationManager");


router.post("/:userId",  async (req, res) => {
    const userId = req.user._id;

    const { longCardNumber, expirationDate, cvvCode} = { ...req.body };

    try {

        await completeTransactionManager.verifyCardDetails(longCardNumber, expirationDate, cvvCode);
        
        
        const order = await orderConfirmationManager.create(userId);

        
        res.status(200).json(order);

    } catch(err) {
        // const errorMessages = extractErrorMessages(err);
  
        // res.status(404).render("orders/completeTransaction", { errorMessages});
    }
});

module.exports = router;