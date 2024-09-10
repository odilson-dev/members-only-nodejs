var express = require("express");
var router = express.Router();
const db = require("../db/queries");

router.get("/", async (req, res) => {
  const messages = await db.selectAllMessages();
  res.render("index", { messages });
});

router.get("/sign-up", (req, res) => res.render("sign-up-form"));

module.exports = router;
