// dbConfig.js

const mongoose = require("mongoose");

const MONGO_URL = "mongodb+srv://anitaantony146:AnitA12345@cluster0.qpmnltj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";//include your url here

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
};

module.exports = connectToDatabase;
