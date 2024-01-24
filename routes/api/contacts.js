const express = require("express");
const router = express.Router();
const contactsController = require("../../services/contactsController");
const {
  updateContactSchema,
  addContactSchema,
} = require("../../services/contactsSchemas");

router.patch("/api/contacts/:contactId/favorite", async (req, res) => {
  const contactId = req.params.contactId;
  const { favorite } = req.body;

  if (typeof favorite === "undefined") {
    return res.status(400).json({ message: "missing field favorite" });
  }

  try {
    const updatedContact = await contactsController.findByIdAndUpdate(
      contactId,
      { $set: { favorite } },
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    console.error("Error updating contact status:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

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
    const validationResult = addContactSchema.validate(newContact, {
      abortEarly: false,
    });

    if (validationResult.error) {
      const errorDetails = validationResult.error.details.map((detail) => ({
        field: detail.path[0],
        message: detail.message,
      }));

      return res.status(400).json({
        message: "Validation error",
        details: errorDetails,
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

  try {
    const validationResult = updateContactSchema.validate(updatedFields, {
      abortEarly: false,
    });

    if (validationResult.error) {
      return res.status(400).json({
        message: "Validation error",
        details: validationResult.error.details,
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
