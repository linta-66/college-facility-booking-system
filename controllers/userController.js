// controllers/userController.js

exports.dashboard = (req, res) => {
    res.render("user/dashboard", { title: "User Dashboard" });
  };
  
  exports.showBookingPage = (req, res) => {
    res.render("user/booking", { title: "Book a Facility" });
  };
  
  exports.bookFacility = (req, res) => {
    // booking logic goes here
    res.send("Booking submitted!");
  };
  
  exports.showComplaintPage = (req, res) => {
    res.render("user/complaint", { title: "Submit Complaint" });
  };
  
  exports.submitComplaint = (req, res) => {
    // complaint save logic here
    res.send("Complaint submitted!");
  };
  
  exports.showProfile = (req, res) => {
    res.render("user/profile", { title: "Profile" });
  };
  