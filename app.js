const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// Database Config
require("./dbConfig"); // MongoDB connection file

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Sessions
app.use(
  session({
    secret: "facility_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

// Set EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Import Routes
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const indexRoutes = require("./routes/index"); // 👈 NEW landing page route

// Mount Routes
app.use("/", indexRoutes); // 👈 This serves landing page (index.ejs)
app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

// 404 Page
app.use((req, res) => {
  res.status(404).render("partials/404", { title: "Page Not Found" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
