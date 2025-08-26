// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Dashboard
router.get("/dashboard", userController.dashboard);

// Booking
router.get("/booking", userController.showBookingPage);
router.post("/booking", userController.bookFacility);

// Complaints
router.get("/complaint", userController.showComplaintPage);
router.post("/complaint", userController.submitComplaint);

// Profile
router.get("/profile", userController.showProfile);

module.exports = router;
