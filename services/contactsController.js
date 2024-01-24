const Contact = require("./contactModel");

const listContacts = async () => {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const getById = async (id) => {
  try {
    const contact = await Contact.findById(id);
    return contact;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const addContact = async (newContact) => {
  try {
    const addedContact = await Contact.create(newContact);
    return addedContact;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const removeContact = async (id) => {
  try {
    const result = await Contact.findByIdAndDelete(id);
    return result ? { message: "Contact deleted" } : null;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const updateContact = async (contactId, updatedContact) => {
  try {
    const result = await Contact.findByIdAndUpdate(contactId, updatedContact, {
      new: true,
    });
    return result;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

module.exports = {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
};
