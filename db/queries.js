const pool = require("./pool");
async function insertUser(user) {
  return await pool.query(
    `INSERT INTO users (first_name, last_name, email, password, createdAt) VALUES ($1, $2, $3, $4, $5)`,
    [user.first_name, user.last_name, user.email, user.password, "NOW()"]
  );
}

module.exports = [insertUser];
