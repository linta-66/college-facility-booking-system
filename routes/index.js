const express = require("express");
const router = express.Router();

// Landing page
router.get("/", (req, res) => {
  res.render("index"); // This will render views/index.ejs
});

module.exports = router;
