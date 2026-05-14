const express = require("express");
const router = express.Router();

const authController = require("../controllers/controller");


router.get("/getDB", authController.getDB);
router.get("/getUsers", authController.getUsers);


router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;