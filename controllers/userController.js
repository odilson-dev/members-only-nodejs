const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

// Create a new user
const createUser = asyncHandler(
  async (first_name, last_name, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const result = await pool.query(
      "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id",
      [first_name, last_name, email, hashedPassword]
    );
    return result.rows[0].id; // Return the new user's ID
  }
);

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
