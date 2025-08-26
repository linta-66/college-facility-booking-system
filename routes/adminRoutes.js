const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Admin Dashboard
router.get("/dashboard", adminController.dashboard);

// Manage Facilities
router.get("/manageFacilities", (req, res) => {
  res.render("admin/manageFacilities");
});

// Manage Bookings
router.get("/manageBookings", (req, res) => {
  res.render("admin/manageBookings");
});

// Manage Faculty
router.get("/manageFaculty", (req, res) => {
  res.render("admin/manageFaculty");
});

// View Complaints
router.get("/viewComplaints", (req, res) => {
  res.render("admin/viewComplaints");
});

module.exports = router;
