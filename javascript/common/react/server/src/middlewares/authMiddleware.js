const { SECRET} = require("../config/config");
const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  const token = req.header("X-Authorization");

  if (token) {
    try {
        const decodedToken = jwt.verify(token, SECRET);

        req.user = decodedToken;

        next();
    } catch (err) {
        res.status(401).json({
            message: "You are not authorized!",
        })
    }
  } else {
    next();
  }
};
