var express = require("express");
var router = express.Router();

router.get("/sign-up", (req, res) => res.render("sign-up-form"));

module.exports = router;
