const router = require("express").Router();


router.get("/", (req, res) => res.send("Hello World"));

router.use("/properties", require("./properties"));

router.use("/landlords", require("./landlords"))

router.use("/users", require("./users"))


module.exports = router;
