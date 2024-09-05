var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/sign-up", (req, res) => res.render("sign-up-form"));
router.post("/sign-up", (req, res) => {
  console.log("We're here");
  res.redirect("/");
});

module.exports = router;
