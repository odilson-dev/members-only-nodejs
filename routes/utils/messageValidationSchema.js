const createMessageValidationSchema = {
  title: {
    trim: { options: [" "] },
    notEmpty: { errorMessage: "Title must not be empty" },
    isLength: {
      options: { min: 3, max: 60 },
      errorMessage: "The title must be between 3 and 60 characters",
    },
  },
  content: {
    trim: { options: [" "] },
    notEmpty: { errorMessage: "Message content must not be empty" },
    isLength: {
      options: { min: 3, max: 250 },
      errorMessage: "The message must be between 3 and 250 characters",
    },
  },
  userId: {
    trim: { options: [" "] },
    notEmpty: { errorMessage: " User Id must not be empty" },
  },
};

module.exports = createMessageValidationSchema;
