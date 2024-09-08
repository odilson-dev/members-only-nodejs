var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
});

const user = { first_name: "Patrick" };

router.get("/sign-up", (req, res) => res.render("sign-up-form"));

module.exports = router;
