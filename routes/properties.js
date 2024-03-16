const express = require("express");

const router = express.Router();

const propertiesControllers = require("../controllers/properties");

router.get("/", propertiesControllers.getAllProperties);


router.get("/:id", propertiesControllers.getSingleProperty);

router.post("/properties", propertiesControllers.createProperties);

router.put("/:id", (req, res) => {
  res.send("am in the properties controller");
});
router.delete("/:id", (req, res) => {
  res.send("am in the properties controller");
});

module.exports = router;
