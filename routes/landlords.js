const express = require("express");

const router = express.Router();

const landlordsControllers = require("../controllers/landlords");

router.get("/", landlordsControllers.getAllLandlords);

router.get("/:id", landlordsControllers.getSingleLandlord);

router.post("/", landlordsControllers.createLandlord);

router.put("/:id", landlordsControllers.updateLandlord);
router.delete("/:id", landlordsControllers.deleteSingleLandlord);

module.exports = router;
