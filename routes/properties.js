const express = require("express");

const router = express.Router();

const propertiesControllers = require("../controllers/properties");

router.get("/", propertiesControllers.getAllProperties);


router.get("/:id", propertiesControllers.getSingleProperty);

router.post("/", propertiesControllers.createProperties);

router.put("/:id", propertiesControllers.updateProperty);
router.delete("/:id", propertiesControllers.deleteSingleProperty);


module.exports = router;
