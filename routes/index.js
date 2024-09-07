var express = require("express");
var router = express.Router();
var bcrypt = require("bcryptjs");
const createUserValidationSchema = require("./utils/validationSchemas");

const {
  query,
  matchedData,
  validationResult,
  checkSchema,
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
  checkSchema(createUserValidationSchema),

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
