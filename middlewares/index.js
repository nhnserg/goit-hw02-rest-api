const isValidId = require("./isValidId");
const authToken = require("./authToken");
const validateBody = require("./validateBody");
const { notFoundHandler, errorHandler } = require("./errorHandlers");
const upload = require("./upload");

module.exports = {
  authToken,
  isValidId,
  validateBody,
  notFoundHandler,
  errorHandler,
  upload,
};
