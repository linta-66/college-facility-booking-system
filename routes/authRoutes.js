//routes/authRoutes.js

const express = require("express");
const router = express.Router();

// Login GET route
router.get("/login", (req, res) => {
  res.render("auth/login", { error: null });
});

// Login POST route
router.post("/login", (req, res) => {
  const { email, password } = req.body;
});

module.exports = router;
