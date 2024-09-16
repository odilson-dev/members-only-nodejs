var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController");
const createUserValidationSchema = require("./utils/userValidationSchemas");
const { checkSchema, body } = require("express-validator");
const auth = require("./auth");
require("dotenv").config();
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/join-staff", (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect("/log-in");
  }
  res.render("admin-form", { errors: false });
});
router.post(
  "/join-staff/:id",
  body("adminPassCode")
    .equals(process.env.ADMIN_ACCESS)
    .withMessage("Admin Pass code incorrect! Please try again"),
  userController.checkAdminPassCode
);

router.post(
  "/new",
  checkSchema(createUserValidationSchema),
  userController.handleUserSignUp,
  auth.passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

router.get("/join-the-club", (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect("/log-in");
  }
  res.render("join-the-club", { errors: false });
});

router.post(
  "/join-the-club/:id",
  body("passCode")
    .equals(process.env.ACCESS_CODE)
    .withMessage("Pass code incorrect! Please try again"),
  userController.checkMemberPassCode
);

module.exports = router;
