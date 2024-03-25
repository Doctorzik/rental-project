const express = require("express");

const router = express.Router();

const usersControllers = require("../controllers/users");
const authenticate = require("../middleware/authenticate")
router.get("/",  usersControllers.getAllUsers);


router.get("/:id", usersControllers.getSingleUser);

router.post("/", authenticate.isAuthenticated, usersControllers.createUser);

router.put("/:id", authenticate.isAuthenticated, usersControllers.updateUser);
router.delete("/:id", authenticate.isAuthenticated, usersControllers.deleteSingleUser);


module.exports = router;
