var express = require("express");
var router = express.Router();
var bcrypt = require("bcryptjs");
const {
  query,
  matchedData,
  validationResult,
  body,
} = require("express-validator");

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
});

router.get("/sign-up", (req, res) => res.render("sign-up-form"));
router.get("/hello", query("person").trim().notEmpty().escape(), (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data = matchedData(req);
    return res.send(`Hello, ${data.person}!`);
  }

  res.send({ errors: result.array() });
});

router.post(
  "/sign-up",
  [
    body("first_name")
      .trim()
      .notEmpty()
      .withMessage("Must not be empty")
      .isAlpha()
      .withMessage("Must be alphabet"),
    body("last_name")
      .trim()
      .notEmpty()
      .withMessage("Must not be empty")
      .isAlpha()
      .withMessage("Must be alphabet"),
    body("email")
      .notEmpty()
      .withMessage("This field should not be empty")
      .isEmail()
      .withMessage("It must be an email"),
    body("password")
      .trim()
      .notEmpty()
      .isLength({ min: 8, max: 12 })
      .withMessage("Must be between 8 and 12 characters"),
    body("confirmPassword")
      .trim()
      .notEmpty()
      .isLength({ min: 8, max: 12 })
      .withMessage("Must be between 8 and 12 characters")
      .equals()
      .withMessage("Must be equals to password field"),
  ],

  (req, res) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
      const data = matchedData(req);
      return res.send(data);
    }

    res.send({ errors: result.array() });

    // bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    //   // if err, do something
    //   // otherwise, store hashedPassword in DB
    // });
  }
);

module.exports = router;
