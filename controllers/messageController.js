const db = require("../db/queries");
const asyncHandler = require("express-async-handler");
const { matchedData, validationResult } = require("express-validator");

// Create a new message
const createMessage = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("new-message-form", { errors: errors.array() });
  }

  const data = matchedData(req);

  try {
    await db.insertMessage(data);

    // Send a success response
    res.redirect("/");
  } catch (error) {
    // Handle errors from bcrypt or any other issue
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// Delete a message or post

const deleteMessage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await db.deleteMessage(id);
  res.redirect("/");
});

const getAllMessages = asyncHandler(async (req, res) => {
  const messages = await db.selectAllMessages();
  return messages;
});
module.exports = { createMessage, getAllMessages, deleteMessage };
