const db = require("../db/queries");
const asyncHandler = require("express-async-handler");
const { matchedData, validationResult } = require("express-validator");

// Create a new user
const createMessage = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const data = matchedData(req);

  try {
    await db.insertMessage(data);

    // Send a success response
    res.status(201).json(data);
  } catch (error) {
    // Handle errors from bcrypt or any other issue
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

const getAllMessages = asyncHandler(async (req, res) => {
  const messages = await db.selectAllMessages();
});
module.exports = { createMessage, getAllMessages };
