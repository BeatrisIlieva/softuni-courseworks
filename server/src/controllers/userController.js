const router = require("express").Router();
const userManager = require("../managers/userManager");
const addressManager = require("../managers/addressBookManager");
const {transferUUIDToUserIDForModelShoppingBag} = require("../utils/transferUUIDToUserIDForModelShoppingBag");

router.post("/register", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const { token, userId } = await userManager.register({
      email,
      password,
      firstName,
      lastName,
    });

    const userUUID = req.headers["user-uuid"];

    // await transferSessionWishlistToModelWishlist(req, userId);

    await transferUUIDToUserIDForModelShoppingBag(userUUID, userId);

    res.status(200).json({ token, userId });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      message: "Some error",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = { ...req.body };
    const result = await userManager.login(email, password);
    const userId = result.user._id;

    const userUUID = req.headers["user-uuid"];


    // await transferSessionWishlistToModelWishlist(req, userId);

    await transferUUIDToUserIDForModelShoppingBag(userUUID, userId);

    res.status(200).json(result);
  } catch (err) {
    console.log(err.message)
    res.status(400).json({
      message: err.message,
    });
  }
});

router.get("/logout", (req, res) => {
  res.end();
});

router.get("/edit/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    address = await addressManager.getOne(userId);

    res.json({ address });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await userManager.getOne(userId);
    res.status(200).json(user)
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

router.put("/edit-email/:userId",  async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)
  const userId = req.user._id;


  try {
    const result = await userManager.changeEmail(email, password, userId);

    res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      message: "Some error",
    });
  }
});

router.put("/change-password/:userId", async (req, res) => {
  const { oldPassword, newPassword} = req.body;
  const userId = req.user._id;

  try {
    const user = await userManager.changePassword(
      oldPassword,
      newPassword,
      userId
    );

    res.status(200).json(user);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      message: "Some error",
    });
  }
});

// router.post("/login", async (req, res, next) => {
//   const { email, password } = req.body;

//     try {
//       const { token, user } = await userManager.login(email, password);

//           res.json({token, user});
//         } catch (err) {
//           res.status(400).json({
//             message: err.message,
//           });
//         }
// });

// module.exports = router;

// const router = require("express").Router();

// const userManager = require("../managers/userManager");

// router.post("/register", async (req, res) => {
//   try {
//     const result = await userManager.register(req.body);

//     res.status(200).json({result});
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({
//       message: "Some error",
//     });
//   }

//   res.end();
// });

// router.post("/login", async (req, res) => {
//   try {
//     const result = await userManager.login(req.body);

//     res.json(result);
//   } catch (err) {
//     res.status(400).json({
//       message: err.message,
//     });
//   }
// });

// router.get("/logout", (req, res) => {
//     res.end();
// })

module.exports = router;
