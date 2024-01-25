const notFoundHandler = (req, res, next) => {
  res.status(404).json({ message: "Not found" });
};

// errorHandler
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
};

const HttpError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = {
  notFoundHandler,
  errorHandler,
  HttpError,
};
