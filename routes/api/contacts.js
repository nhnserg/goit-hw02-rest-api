const express = require("express");
const {
  updateContactSchema,
  addContactSchema,
  patchSchema,
} = require("../../services/contactsSchemas");
const { isValidId } = require("../../middlewares/isValidId");

const validateBody = require("../../middlewares/validateBody");
const connect = require("../../controllers/contacts");
const authToken = require("../../middlewares/authToken");
const router = express.Router();

router.get("/", authToken, connect.listContacts);

router.get("/:id", authToken, isValidId, connect.getById);

router.post("/", authToken, validateBody(addContactSchema), connect.addContact);

router.delete("/:id", authToken, isValidId, connect.deleteContact);

router.put(
  "/:id",
  authToken,
  isValidId,
  validateBody(updateContactSchema),
  connect.updateContact
);

router.patch(
  "/:id/favorite",
  authToken,
  isValidId,
  validateBody(patchSchema),
  connect.updateFavorite
);

module.exports = router;
