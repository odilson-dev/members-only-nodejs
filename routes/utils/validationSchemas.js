const createUserValidationSchema = {
  first_name: {
    trim: { options: [" "] },
    notEmpty: { errorMessage: "Fist name must not be empty" },
    isAlpha: { errorMessage: "First name must be alphabet" },
  },
  last_name: {
    trim: { options: [" "] },
    notEmpty: { errorMessage: "Last name must not be empty" },
    isAlpha: { errorMessage: "Last name must be alphabet" },
  },
  email: {
    notEmpty: { errorMessage: "Email must not be empty" },
    isEmail: { errorMessage: "Email must be an email" },
  },
  password: {
    trim: { options: [" "] },
    notEmpty: { errorMessage: "The password must not be empty" },
    isLength: {
      options: { min: 8, max: 12 },
      errorMessage: "The password must be between 8 and 12 characters",
    },
  },
  confirmPassword: {
    custom: {
      options: (value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("The confirm Password must match the password field");
        }
        return true;
      },
    },
  },
};

module.exports = createUserValidationSchema;
