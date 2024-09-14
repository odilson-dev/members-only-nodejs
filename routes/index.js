var express = require("express");
var router = express.Router();
const db = require("../db/queries");

const userController = require("../controllers/userController");
const userLoginValidationSchema = require("./utils/userLoginValidationSchema");
const auth = require("./auth");
const { checkSchema } = require("express-validator");

router.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

router.get("/", async (req, res) => {
  const messages = await db.selectAllMessages();
  res.render("index", { messages });
});

router.get("/log-in", (req, res) => res.render("log-in", { errors: false }));

router.post(
  "/log-in",
  checkSchema(userLoginValidationSchema),
  userController.handleUserLogIn,
  auth.passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

router.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get("/sign-up", (req, res) =>
  res.render("sign-up-form", { errors: false })
);

module.exports = router;
