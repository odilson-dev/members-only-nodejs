var express = require("express");
var router = express.Router();

router.get("/new-message", (req, res) => res.render("new-message-form"));

module.exports = router;
