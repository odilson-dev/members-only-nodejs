var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController");
const createUserValidationSchema = require("./utils/validationSchemas");

const { checkSchema } = require("express-validator");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post(
  "/new",
  checkSchema(createUserValidationSchema),
  userController.createUser
);

module.exports = router;
