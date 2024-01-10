const express = require("express");
const router = express.Router();
const {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  res.json({ message: "Homework done!" });
});

router.get("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.post("/", validateMiddleware, (req, res) => {
  const newContact = req.body;
  const result = addContact(newContact);
  res.status(201).json(result);
});
router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:id", validateMiddleware, (req, res) => {
  const contactId = req.params.id;
  const updatedContact = req.body;
  const result = updateContact(contactId, updatedContact);

  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;
