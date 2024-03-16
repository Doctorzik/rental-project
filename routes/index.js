const router = require("express").Router();


router.get("/", (req, res) => res.send("Hello World"));

router.use("/properties", require("./properties"));

module.exports = router;
