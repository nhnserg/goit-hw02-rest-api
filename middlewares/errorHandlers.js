const notFoundHandler = (req, res, next) => {
  res.status(404).json({ message: "Not found" });
  next();
};

// errorHandler
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error" });
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
