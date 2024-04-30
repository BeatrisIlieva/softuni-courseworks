const router = require("express").Router();
const userManager = require("../managers/userManager");
const { isAuth } = require("../middlewares/authMiddleware");

router.post("/register", async (req, res) => {
  const { email, password, repeatPassword } = req.body;

  try {
    const { token, userId } = await userManager.register({
      email,
      password,
      repeatPassword,
    });

    res.status(200).json({ token, userId });

  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      message: "Some error",
    });
  }
});

// router.post("/change-email", isAuth, async (req, res) => {
//   const { email, password } = req.body;
//   userId = req.user._id;

//   try {
//     await userManager.changeEmail(email, password, userId);

//     req.flash("success", "Email updated successfully!");

//     res.status(200).json();
//   } catch (err) {
//       console.log(err.message);
//       res.status(400).json({
//         message: "Some error"})
//   }
// });

// router.post("/change-password", isAuth, async (req, res) => {
//   const { oldPassword, password, repeatPassword } = req.body;
//   userId = req.user._id;

//   const email = req.user.email;

//   try {
//     await userManager.changePassword(
//       oldPassword,
//       password,
//       repeatPassword,
//       userId
//     );

//     req.flash("success", "Password updated successfully!");

//     res.redirect("/profiles/edit");
//   } catch (err) {
//     res.status(400).json({
//       message: "Some error",
//     });
//   }
// });


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



module.exports = router;

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
