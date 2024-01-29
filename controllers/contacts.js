const { connectWrapper } = require("../helpers");
const { HttpError } = require("../helpers/HttpError");
const Contact = require("../services/contactModel");

const listContacts = async (req, res) => {
  const dataBase = await Contact.find();
  res.json(dataBase);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const contactById = await Contact.findById(id);
  if (!contactById) {
    throw HttpError(404, "Not found");
  }
  res.json(contactById);
};

const addNewContact = async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json(newContact);
  if (!newContact) {
    throw HttpError(404, "Not Found");
  }
  res.json(newContact);
};

const updateContact = async (req, res) => {
  const { id } = req.params;

  if (!req.body || Object.keys(req.body).length === 0) {
    throw HttpError(400, "missing fields");
  }

  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const removeId = await Contact.findByIdAndDelete(id);
  if (!removeId) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Contact deleted" });
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  if (!req.body || Object.keys(req.body).length === 0) {
    throw HttpError(400, "missing field favorite");
  }

  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  listContacts: connectWrapper(listContacts),
  getById: connectWrapper(getById),
  addNewContact: connectWrapper(addNewContact),
  updateContact: connectWrapper(updateContact),
  deleteContact: connectWrapper(deleteContact),
  updateFavorite: connectWrapper(updateFavorite),
};
