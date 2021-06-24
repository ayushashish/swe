const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  res.status(error.statusCode || 500).json({
    success: false,
    check: error.message,
    errors: [{ message: "Something went wrong." }],
  });
};

module.exports = errorHandler;
