const { func } = require("joi");
const passport = require("passport");

const router = require("express").Router();
router.use("/users", require("./users"));

router.use("/", require("./swagger"));

// #swagger.tags = ['Hello World']

router.use("/properties", require("./properties"));
router.use("/landlords", require("./landlords"));

router.get("/login", passport.authenticate("github"), (req, res) => {});

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
