const { connectWrapper } = require("../helpers");
const { HttpError } = require("../helpers/HttpError");
const Contact = require("../services/contactModel");

const listContacts = async (req, res) => {
  const dataBase = await Contact.find();
  res.json(dataBase);
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findById(id);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;

  if (!req.body || Object.keys(req.body).length === 0) {
    throw new HttpError(400, "missing fields");
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
  addContact: connectWrapper(addContact),
  updateContact: connectWrapper(updateContact),
  deleteContact: connectWrapper(deleteContact),
  updateFavorite: connectWrapper(updateFavorite),
};
