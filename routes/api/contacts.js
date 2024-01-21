const express = require("express");
const router = express.Router();
const contactsController = require("../../services/contactsController");
const {
  updateContactSchema,
  addContactSchema,
} = require("../../services/contactsSchemas");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsController.listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await contactsController.getById(id);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const newContact = req.body;

  try {
    const validationResult = addContactSchema.validate(newContact);

    if (validationResult.error) {
      return res.status(400).json({
        message: validationResult.error.message,
      });
    }

    const addedContact = await contactsController.addContact(
      validationResult.value
    );

    res.status(201).json(addedContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await contactsController.getById(id);
    if (contact) {
      await contactsController.removeContact(id);
      res.status(200).json({ message: "contact deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  const contactId = req.params.id;
  const updatedFields = req.body;

  if (Object.keys(updatedFields).length === 0) {
    return res.status(400).json({
      message: "Request body is empty",
    });
  }

  try {
    const validationResult = updateContactSchema.validate(updatedFields);

    if (validationResult.error) {
      return res.status(400).json({
        message: validationResult.error.message,
      });
    }

    const updatedContact = await contactsController.updateContact(
      contactId,
      validationResult.value
    );

    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
