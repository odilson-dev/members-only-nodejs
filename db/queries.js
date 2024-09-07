const pool = require("./pool");
async function insertUser(user, hashedPassword) {
  await pool.query(
    `INSERT INTO users (first_name, last_name, email, password, created_at) VALUES ($1, $2, $3, $4, $5)`,
    [user.first_name, user.last_name, user.email, hashedPassword, "NOW()"]
  );
}

module.exports = { insertUser };
