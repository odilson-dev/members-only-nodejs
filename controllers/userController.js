const bcrypt = require("bcryptjs");
const db = require("../db/queries");
const asyncHandler = require("express-async-handler");
const { matchedData, validationResult } = require("express-validator");

// Create a new user
const handleUserSignUp = asyncHandler(async (req, res, next) => {
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
const handleUserLogIn = asyncHandler(async (req, res, next)=>{
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("log-in", { errors: errors.array() });
  }
  
  next();
})
// check member pass code
const checkMemberPassCode = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const { id } = req.params;
    await db.updateMembershipStatus(id, true);
    return res.redirect("/");
  } else {
    return res.render("join-the-club", { errors: errors.array() });
  }
});
// Check admin pass code
const checkAdminPassCode = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { id } = req.params;
    await db.updateAdminStatus(id, true);
    return res.redirect("/");
  } else {
    return res.render("admin-form", { errors: errors.array() });
  }
});
module.exports = {
  handleUserSignUp,
  handleUserLogIn,
  checkMemberPassCode,
  checkAdminPassCode,
};
