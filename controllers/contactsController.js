const fs = require("fs").promises;
const path = require("path");
const Joi = require("joi");

const contactsPath = path.join(__dirname, "..", "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const getById = async (id) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((c) => c.id.toString() === id.toString());
    return contact;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const addContact = async (newContact) => {
  try {
    const contacts = await listContacts();
    const updatedContacts = [
      ...contacts,
      { ...newContact, id: Date.now().toString() },
    ];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    return { ...newContact, id: updatedContacts.length };
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const removeContact = async (id) => {
  try {
    const contacts = await listContacts();
    const updatedContacts = contacts.filter(
      (c) => c.id.toString() !== id.toString()
    );
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    return { message: "contact deleted" };
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const updateContact = async (contactId, updatedContact) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(
      (c) => c.id.toString() === contactId.toString()
    );

    if (index !== -1) {
      contacts[index] = { ...contacts[index], ...updatedContact };
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return contacts[index];
    }

    return null;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const validateContact = (contact) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });

  return schema.validate(contact);
};

module.exports = {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
  validateContact,
};
