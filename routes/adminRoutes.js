// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const { User } = require("../models/userModels");

// Middleware to check admin session
function isAdmin(req, res, next) {
  if (req.session.user && req.session.user.type === "admin") return next();
  return res.redirect("/admin/login");
}

// Login GET
router.get("/login", (req, res) => {
  res.render("auth/login", { error: null });
});

// Login POST
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailInput = email.trim().toLowerCase();

    // Find user
    const user = await User.findOne({ user_email: emailInput });
    if (!user) {
      console.log("User not found:", emailInput);
      return res.render("auth/login", { error: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log("Password mismatch:", emailInput);
      return res.render("auth/login", { error: "Invalid email or password" });
    }

    // Save session
    req.session.user = {
      id: user._id,
      name: user.user_name,
      email: user.user_email,
      type: user.user_type.toLowerCase(),
    };

    // Redirect based on type
    if (req.session.user.type === "admin") return res.redirect("/admin/dashboard");
    if (req.session.user.type === "user") return res.redirect("/user/dashboard");

    return res.render("auth/login", { error: "Invalid user type" });
  } catch (err) {
    console.error(err);
    res.render("auth/login", { error: "Something went wrong" });
  }
});

// Admin dashboard
router.get("/dashboard", isAdmin, (req, res) => {
  res.render("admin/dashboard", { welcomeMessage: `Welcome, ${req.session.user.name}!` });
});

module.exports = router; 