const bcrypt = require("bcryptjs");
const db = require("../db/queries");
const asyncHandler = require("express-async-handler");
const { matchedData, validationResult } = require("express-validator");

// Create a new user
const createUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const data = matchedData(req);

  try {
    // Hash the password asynchronously
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const result = await db.insertUser(data, hashedPassword);
    // Retrieve the inserted user's ID
    const id = result.rows[0].id;

    // Send a success response
    res.status(201).render("join-the-club", { user: data, id });
  } catch (error) {
    // Handle errors from bcrypt or any other issue
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// check pass code
const checkPassCode = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { id } = req.params;
    await db.updateMembershipStatus(id, true);
    return res.send("Success, you're a member");
  }
  res.status(400).json({ errors: errors.array() });
});

const showDashboard = asyncHandler(async (req, res) => {
  const messages = await db.selectAllMessages();
  const users = await db.getUsers();
  res.render("adminDashboard", { messages, users });
});

// // Find a user by email
// const findUserByEmail = asyncHandler(async (email) => {
//   const result = await pool.query("SELECT * FROM users WHERE email = $1", [
//     email,
//   ]);
//   return result.rows[0]; // Return the user object
// });

// // Verify a user's password
// const verifyPassword = asyncHandler(async (password, hashedPassword) => {
//   return await bcrypt.compare(password, hashedPassword); // Compare the plain-text password with the hashed password
// });

// // Check membership status of a user
// const checkMembershipStatus = asyncHandler(async (user_id) => {
//   const result = await pool.query(
//     "SELECT membership_status FROM users WHERE id = $1",
//     [user_id]
//   );
//   return result.rows[0].membership_status;
//});

module.exports = {
  createUser,
  checkPassCode,
  showDashboard,
  //   findUserByEmail,
  //   verifyPassword,
  //   checkMembershipStatus,
};
