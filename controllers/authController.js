// controllers/authController.js

exports.showLogin = (req, res) => {
  res.render("auth/login", { title: "Login" });
};

exports.loginUser = (req, res) => {
  // Handle login logic here
  res.send("Login logic goes here");
};

exports.showSignup = (req, res) => {
  res.render("auth/signup", { title: "Sign Up" });
};

exports.registerUser = (req, res) => {
  // Handle signup logic here
  res.send("Signup logic goes here");
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
