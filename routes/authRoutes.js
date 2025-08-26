const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Login Route
router.get("/login", authController.showLogin); // render login.ejs
router.post("/login", authController.loginUser); // handle login form

// Signup Route
router.get("/signup", authController.showSignup);
router.post("/signup", authController.registerUser);

// Logout
router.get("/logout", authController.logout);

module.exports = router;
