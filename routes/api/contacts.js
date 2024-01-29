const express = require("express");
const {
  updateContactSchema,
  addContactSchema,
  patchSchema,
} = require("../../services/contactsSchemas");
const isValidId = require("../../middlewares/isValidId");

const validateBody = require("../../middlewares/validateBody");
const connect = require("../../controllers/contacts");
const router = express.Router();

router.get("/", connect.listContacts);

router.get("/:id", isValidId, connect.getById);

router.post("/", validateBody(updateContactSchema), connect.addNewContact);

router.delete("/:id", isValidId, connect.deleteContact);

router.put(
  "/:id",
  isValidId,
  validateBody(addContactSchema),
  connect.updateContact
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(patchSchema),
  connect.updateFavorite
);

module.exports = router;
