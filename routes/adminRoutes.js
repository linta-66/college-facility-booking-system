const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Dashboard
router.get('/dashboard', (req, res) => {
    res.render('admin/adminDashboard');
  });
  
// Facilities
router.get('/manage-facilities', adminController.manageFacilities);
router.post('/add-facility', adminController.addFacility);

// Bookings
router.get('/manage-bookings', adminController.manageBookings);

// Faculty
router.get('/manage-faculty', adminController.manageFaculty);

// Classroom Allotment
router.get('/classroom-allotment', adminController.classroomAllotment);

// Complaints
router.get('/view-complaints', adminController.viewComplaints);

// Profile
router.get('/profile', adminController.manageProfile);

module.exports = router;
