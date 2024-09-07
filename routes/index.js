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
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Must not be empty")
      .isLength({ min: 3, max: 10 })
      .withMessage("Must be between 3 and 10 characters"),
    body("index")
      .notEmpty()
      .withMessage("Must not be empty")
      .equals("3")
      .withMessage("Should be equals to 3"),
  ],
  (req, res) => {
    const result = validationResult(req);
    const data = matchedData(req);
    console.log(result);
    console.log(data);

    // bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    //   // if err, do something
    //   // otherwise, store hashedPassword in DB
    // });

    console.log("We're here");
    res.json(result);
  }
);

module.exports = router;
