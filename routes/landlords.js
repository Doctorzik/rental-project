const express = require("express");

const router = express.Router();

const landlordsControllers = require("../controllers/landlords");

const authenticate = require("../middleware/authenticate")

router.get("/", landlordsControllers.getAllLandlords);

router.get("/:id",   landlordsControllers.getSingleLandlord);

router.post("/",  authenticate.isAuthenticated, landlordsControllers.createLandlord);

router.put("/:id",  authenticate.isAuthenticated, landlordsControllers.updateLandlord);
router.delete("/:id", authenticate.isAuthenticated, landlordsControllers.deleteSingleLandlord);

module.exports = router;
