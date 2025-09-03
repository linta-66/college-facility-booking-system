// models/userModels.js 
const mongoose = require("mongoose"); 
const bcrypt = require("bcryptjs"); 

// Department Schema 
const departmentSchema = new mongoose.Schema(
  { dept_id: { type: Number, required: true, unique: true },
   dept_name: { type: String, required: true },
    dept_head: { type: String, required: true },
 }); 

 // User Schema 
 const userSchema = new mongoose.Schema({ 
  user_id: { type: Number, required: true, unique: true },
  user_name: { type: String, required: true },
  user_email: { type: String, required: true, unique: true },
  user_contact: { type: String, required: true },
  dept_id: { type: Number, ref: "Department", required: true, },
  password: { type: String, required: true },
  user_type: { type: String,
     enum: ["admin", "user"],
     default: "user", },
 }); 
 
 //Hash password before saving 
 
userSchema.pre("save", async function (next) {
   if (this.isModified("password")) {
     const salt = await bcrypt.genSalt(10);
     this.password = await bcrypt.hash(this.password, salt);
   }
    next();
 });
 
 //Method to compare entered password with hashed password 
 userSchema.methods.comparePassword = async function (enteredPassword) { 
  return await bcrypt.compare(enteredPassword, this.password);
 }; 
 
 const Department = mongoose.model("Department", departmentSchema);
const User = mongoose.model("User", userSchema);
  
module.exports = { Department, User };