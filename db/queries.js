const pool = require("./pool");

async function getUsers() {
  const { rows } = await pool.query("SELECT * FROM users;");
  return rows;
}
async function insertUser(user, hashedPassword) {
  const result = await pool.query(
    `INSERT INTO users (first_name, last_name, email, password, created_at) VALUES ($1, $2, $3, $4, $5) 
    RETURNING id, first_name, last_name, email;`,
    [user.first_name, user.last_name, user.email, hashedPassword, "NOW()"]
  );
  return result.rows[0];
}

async function updateMembershipStatus(id, status) {
  await pool.query(
    `UPDATE users
    SET membership_status = $1
    WHERE id = $2;`,
    [status, id]
  );
}

async function updateAdminStatus(id, status) {
  await pool.query(`UPDATE users SET admin = $1 WHERE id = $2;`, [status, id]);
}
async function insertMessage(message) {
  return await pool.query(
    `INSERT INTO messages (title, text, user_id, created_at) VALUES ($1, $2, $3, $4) 
    RETURNING id;`,
    [message.title, message.content, message.userId, "NOW()"]
  );
}

async function selectAllMessages() {
  const { rows } =
    await pool.query(`SELECT messages.id, messages.title, messages.text, messages.created_at, users.first_name, users.last_name
  FROM messages
  JOIN users ON messages.user_id = users.id;
  `);
  return rows;
}

async function deleteMessage(id) {
  await pool.query(`DELETE FROM messages WHERE id = $1`, [id]);
}
module.exports = {
  getUsers,
  insertUser,
  updateMembershipStatus,
  updateAdminStatus,
  insertMessage,
  deleteMessage,
  selectAllMessages,
};
