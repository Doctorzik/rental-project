const express = require("express");

const router = express.Router();

const propertiesControllers = require("../controllers/properties");
const authenticate = require("../middleware/authenticate.js");

router.get("/", propertiesControllers.getAllProperties);

router.get("/:id", propertiesControllers.getSingleProperty);

router.post("/", authenticate.isAuthenticated, propertiesControllers.createProperties);

router.put("/:id", authenticate.isAuthenticated, propertiesControllers.updateProperty);
router.delete("/:id", authenticate.isAuthenticated, propertiesControllers.deleteSingleProperty);

module.exports = router;
