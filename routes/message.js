var express = require("express");
var router = express.Router();
var messageController = require("../controllers/messageController");
var createMessageValidationSchema = require("./utils/messageValidationSchema");
const { checkSchema } = require("express-validator");

router.get("/new", (req, res) => res.render("new-message-form"));
router.post(
  "/new",
  checkSchema(createMessageValidationSchema),
  messageController.createMessage
);

module.exports = router;
