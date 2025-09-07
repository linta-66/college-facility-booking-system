const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// ---------------- Models ----------------
const Booking = mongoose.models.Booking || mongoose.model("Booking", new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  facility_id: { type: mongoose.Schema.Types.ObjectId, ref: "Facility" },
  date: String,
  time_slot: String,
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" }
}));

const ChangeRequest = mongoose.models.ChangeRequest || mongoose.model("ChangeRequest", new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  booking_id: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
  reason: String,
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  createdAt: { type: Date, default: Date.now }
}));

const Facility = mongoose.models.Facility || mongoose.model("Facility", new mongoose.Schema({
  name: String,
  type: { type: String, enum: ["classroom", "seminar hall", "conference hall"] },
  location: String,
  isActive: { type: Boolean, default: true }
}));

// ---------------- Middleware ----------------
function isUser(req, res, next) {
  if (req.session.user && req.session.user.type === "user") return next();
  return res.redirect("/auth/login");
}

// ---------------- Routes ----------------

// ✅ View Allotments (with stats)
router.get("/viewAllotments", isUser, async (req, res) => {
  try {
    const userId = req.session.user._id;

    const [allFacilities, allotments] = await Promise.all([
      Facility.find({ isActive: true }).lean(),
      Booking.find({ user_id: userId, status: "approved" }).populate("facility_id").lean()
    ]);

    const countByType = (type) => allFacilities.filter(f => f.type === type).length;

    const stats = {
      classrooms: countByType("classroom"),
      seminarHalls: countByType("seminar hall"),
      conferenceHalls: countByType("conference hall"),
      totalFacilities: allFacilities.length
    };

    res.render("user/viewAllotments", {
      allotments,
      stats,
      user: req.session.user,
      activePage: "viewAllotments"
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching allotments");
  }
});
router.get("/classrooms", isUser, async (req, res) => {
  try {
    const classrooms = await Facility.find({ type: "classroom", isActive: true }).lean();
    res.render("user/classrooms", {
      classrooms,
      user: req.session.user
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading classrooms");
  }
});
router.get("/seminarhalls", isUser, async (req, res) => {
  const seminarHalls = await Facility.find({ type: "seminar hall", isActive: true }).lean();
  res.render("user/seminarhalls", { seminarHalls, user: req.session.user });
});

router.get("/conferencehalls", isUser, async (req, res) => {
  const conferenceHalls = await Facility.find({ type: "conference hall", isActive: true }).lean();
  res.render("user/conferencehalls", { conferenceHalls, user: req.session.user });
});
// Seminar Halls page
router.get("/seminarhalls", isUser, async (req, res) => {
  try {
    const seminarHalls = await Facility.find({ type: "seminar hall", isActive: true }).lean();
    res.render("user/seminarhalls", {
      seminarHalls,
      user: req.session.user
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading seminar halls");
  }
});

// Conference Halls page
router.get("/conferencehalls", isUser, async (req, res) => {
  try {
    const conferenceHalls = await Facility.find({ type: "conference hall", isActive: true }).lean();
    res.render("user/conferencehalls", {
      conferenceHalls,
      user: req.session.user
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading conference halls");
  }
});


module.exports = router;
