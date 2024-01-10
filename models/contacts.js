const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "..", "data", "contacts.json");

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

const removeContact = async (id) => {
  try {
    const contacts = await listContacts();
    const updateContacts = contacts.filter(
      (c) => c.id.toString() !== id.toString()
    );
    await fs.writeFile(contactsPath, JSON.stringify(updateContacts, null, 2));
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const addContact = async (newContact) => {
  try {
    const contacts = await listContacts();
    const updatedContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    return newContact;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const updateContact = async (contactId, updateContact) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(
      (c) => c.id.toString() === contactId.toString()
    );
    if (index !== -1) {
      contacts[index] = { ...contacts[index], ...updateContact };
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return contacts[index];
    }
    return null; // як що нема
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
