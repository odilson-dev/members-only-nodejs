var express = require("express");
var router = express.Router();
var messageController = require("../controllers/messageController");
var createMessageValidationSchema = require("./utils/messageValidationSchema");
const { checkSchema } = require("express-validator");

router.get("/new", (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect("/log-in");
  }
  res.render("new-message-form", { errors: false });
});
router.post(
  "/new",
  checkSchema(createMessageValidationSchema),
  messageController.createMessage
);

router.post("/:id/delete", messageController.deleteMessage);
module.exports = router;
