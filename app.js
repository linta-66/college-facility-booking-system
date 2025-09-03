const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const bcrypt = require("bcryptjs");

// Database & Models
const connectToDatabase = require("./dbConfig");
const { User } = require("./models/userModels");

const app = express();
const PORT = 3000;

/* ---------------------------
   Middleware Configuration
---------------------------- */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Session Management
app.use(
  session({
    secret: "facility_secret_key", // should be in .env for production
    resave: false,
    saveUninitialized: true,
  })
);

// Make user data available in all templates
app.use((req, res, next) => {
  if (req.session.user) {
    res.locals.username = req.session.user.user_name; // still keep this
    res.locals.user = req.session.user; // 🔑 expose full user object
  }
  next();
});

/* ---------------------------
   View Engine & Static Files
---------------------------- */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

/* ---------------------------
   Routes
---------------------------- */
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/authRoutes");

app.use("/", indexRoutes);
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/auth", authRoutes);

// 404 Page
app.use((req, res) => {
  res.status(404).render("partials/404", { title: "Page Not Found" });
});

/* ---------------------------
   Insert Sample Users
---------------------------- */
/*
async function insertSampleUsers() {
  try {
    // Check if "anu" already exists
    const existingUser = await User.findOne({ user_email: "anu@gmail.com" });
    if (existingUser) {
      console.log("✅ Sample users already exist, skipping insert.");
      return;
    }

    // Sample user data
    const users = [
      
      {
        user_id: 1,
        user_name: "Admin",
        user_email: "admin@gmail.com",
        user_contact: "9876543210",
        dept_id: 101,
        password: await bcrypt.hash("admin@", 10), // hashed password
        user_type: "admin",
      },
      
      {
        user_id: 5,
        user_name: "anu",
        user_email: "anu@gmail.com",
        user_contact: "8989007656",
        dept_id: 102,
        password: await bcrypt.hash("anu@", 10), // hashed password
        user_type: "user",
      },
    ];

    // Insert users
    await User.insertMany(users);
    console.log("Sample users inserted successfully!");
  } catch (err) {
    console.error("Error inserting sample users:", err);
  }
}*/

/* ---------------------------
   Start Server
---------------------------- */
connectToDatabase()
  .then(async () => {
    app.listen(PORT, () =>
      console.log(`Server running at http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err);
  });
