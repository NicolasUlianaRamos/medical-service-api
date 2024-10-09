const router = require("express").Router();

// controller
const UserController = require("../controllers/UserController");

// middleware
const verifyToken = require("../helpers/verify-token.js");

router.post("/register", verifyToken, UserController.register);
router.post("/login", UserController.login);

router.get("/getall", verifyToken, UserController.getAllUsers)

router.get("/checkuser", UserController.checkUser);
router.get("/checkuserAdmin", verifyToken, UserController.checkUserAdmin)

module.exports = router;
