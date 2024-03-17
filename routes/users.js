const express = require("express");

const router = express.Router();

const usersControllers = require("../controllers/users");

router.get("/", usersControllers.getAllUsers);


router.get("/:id", usersControllers.getSingleUser);

router.post("/", usersControllers.createUser);

router.put("/:id", usersControllers.updateUser);
router.delete("/:id", usersControllers.deleteSingleUser);


module.exports = router;
