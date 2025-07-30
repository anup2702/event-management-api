const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validate = require("../middleware/validate"); 
const { createUserSchema } = require("../utils/validators");


router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", validate(createUserSchema), userController.createUser);

module.exports = router;
