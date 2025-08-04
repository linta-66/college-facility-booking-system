const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Dashboard
router.get('/dashboard', userController.renderDashboard);

// Booking
router.get('/booking', userController.renderBookingPage);
router.post('/book', userController.handleBooking);

// View Allotments
router.get('/view-allotments', userController.viewAllotments);

// Change Request
router.get('/change-request', userController.changeRequest);
router.post('/change-request', userController.submitChangeRequest);

// Complaint
router.get('/complaint', userController.renderComplaintPage);
router.post('/complaint', userController.submitComplaint);

// Notifications
router.get('/notifications', userController.getNotifications);

// Profile
router.get('/profile', userController.viewProfile);

module.exports = router;
