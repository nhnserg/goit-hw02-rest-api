const { connectWrapper } = require("../helpers");
const { HttpError } = require("../helpers/HttpError");
const Contact = require("../services/contactModel");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 3 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "-createdAt -updateAt", {
    skip,
    limit,
  }).populate("owner", "email subscription");

  const favorites = req.query.favorite;

  if (favorites === "true") {
    const filtered = result.filter(
      (contact) => contact.favorite === (favorites === "true")
    );
    res.json(filtered);
  }
  res.json(result);
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const result = await Contact.findOne({ id, owner });
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });

  res.status(201).json(result);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;

  if (!req.body || Object.keys(req.body).length === 0) {
    throw new HttpError(400, "missing fields");
  }

  const result = await Contact.findOneAndUpdate(
    { _id: id, owner: owner },
    req.body,
    {
      new: true,
    }
  );
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const removeId = await Contact.findOneAndDelete({ _id: id, owner: owner });
  if (!removeId) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Contact deleted" });
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  if (!req.body || Object.keys(req.body).length === 0) {
    throw HttpError(400, "missing field favorite");
  }

  const result = await Contact.findOneAndUpdate(
    { _id: id, owner: owner },
    req.body,
    {
      new: true,
    }
  );
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
