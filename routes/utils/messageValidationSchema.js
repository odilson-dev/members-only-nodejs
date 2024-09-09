const createMessageValidationSchema = {
  title: {
    trim: { options: [" "] },
    notEmpty: { errorMessage: "Title must not be empty" },
    isLength: {
      options: { min: 3, max: 60 },
      errorMessage: "The title must be between 3 and 60 characters",
    },
  },
  message: {
    trim: { options: [" "] },
    notEmpty: { errorMessage: "Message content must not be empty" },
    isLength: {
      options: { min: 3, max: 250 },
      errorMessage: "The message must be between 3 and 250 characters",
    },
  },
  user_id: {
    trim: { options: [" "] },
    notEmpty: { errorMessage: " User Id must not be empty" },
  },
};

module.exports = createMessageValidationSchema;
