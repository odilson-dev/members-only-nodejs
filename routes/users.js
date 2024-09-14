var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController");
const createUserValidationSchema = require("./utils/userValidationSchemas");
const { checkSchema, body } = require("express-validator");
const auth = require("./auth");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/be-an-admin", (req, res) => res.render("admin-form"));

router.post(
  "/new",
  checkSchema(createUserValidationSchema),
  userController.createUser,
  auth.passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

router.get("/join-the-club", (req, res) => {
  res.render("join-the-club");
});

router.post(
  "/join-the-club/:id",
  body("passCode")
    .equals("ODIN-CLUB")
    .withMessage("Pass code incorrect! Please try again"),
  userController.checkPassCode
);

module.exports = router;
