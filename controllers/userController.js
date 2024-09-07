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

    
    const user =  await db.insertUser(data, hashedPassword);


    // Send a success response
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    // Handle errors from bcrypt or any other issue
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
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
  //   findUserByEmail,
  //   verifyPassword,
  //   checkMembershipStatus,
};
