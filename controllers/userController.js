const bcrypt = require("bcryptjs");
const db = require("../db/queries");
const asyncHandler = require("express-async-handler");
const { matchedData, validationResult } = require("express-validator");

// Create a new user
const createUser = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("sign-up-form", { errors: errors.array() });
  }

  const data = matchedData(req);

  try {
    // Hash the password asynchronously
    const hashedPassword = await bcrypt.hash(data.password, 10);

    await db.insertUser(data, hashedPassword);

    //const messages = await db.selectAllMessages();
  } catch (error) {
    // Handle errors from bcrypt or any other issue
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
  next();
});

// check pass code
const checkPassCode = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { id } = req.params;
    await db.updateMembershipStatus(id, true);
    return res.redirect("/");
  }
  res.status(400).json({ errors: errors.array() });
});

const checkAdminPassCode = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { id } = req.params;
    await db.updateAdminStatus(id, true);
    return res.redirect("/");
  }
  res.status(400).json({ errors: errors.array() });
});
module.exports = {
  createUser,
  checkPassCode,
  checkAdminPassCode,
};
