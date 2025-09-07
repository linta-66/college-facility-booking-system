const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Department Schema
const departmentSchema = new mongoose.Schema({
  dept_id: { type: Number, required: true, unique: true },
  dept_name: { type: String, required: true },
  dept_head: { type: String, required: true },
});

// User Schema
const userSchema = new mongoose.Schema({
  user_id: { type: Number, required: true, unique: true },
  user_name: { type: String, required: true },
  user_email: { type: String, required: true, unique: true },
  user_contact: { type: String, required: true },
  dept_id: { type: Number, ref: "Department", required: true },
  password: { type: String, required: true },
  user_type: { type: String, enum: ["admin", "user"], default: "user" },
});

// Hash password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Department = mongoose.model("Department", departmentSchema);
const User = mongoose.model("User", userSchema);

module.exports = { Department, User };


const allotmentSchema = new mongoose.Schema({
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  facility_id: { type: mongoose.Schema.Types.ObjectId, ref: "Facility", required: true },
  date: { type: String, required: true },
  time_slot: { type: String, required: true },
  status: { type: String, enum: ["Approved", "Pending", "Rejected"], default: "Pending" },
});

module.exports = mongoose.model("Allotment", allotmentSchema);

const changeRequestSchema = new mongoose.Schema({
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  facility: { type: String, required: true },
  reason: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});
const FacilitySchema = new mongoose.Schema({
  name: String, // e.g., "101", "102"
  type: String, // "classroom", "seminar hall", etc.
  location: String,
  capacity: Number,
  isActive: { type: Boolean, default: true }
});


module.exports = mongoose.model("ChangeRequest", changeRequestSchema);
