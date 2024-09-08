const pool = require("./pool");
async function insertUser(user, hashedPassword) {
  return await pool.query(
    `INSERT INTO users (first_name, last_name, email, password, created_at) VALUES ($1, $2, $3, $4, $5) 
    RETURNING id;`,
    [user.first_name, user.last_name, user.email, hashedPassword, "NOW()"]
  );
}

async function updateMembershipStatus(id, status) {
  await pool.query(
    `UPDATE users
    SET membership_status = $1
    WHERE id = $2;`,
    [status, id]
  );
}

module.exports = { insertUser, updateMembershipStatus };
