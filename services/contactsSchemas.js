const Joi = require("joi");

const updateContactSchema = Joi.object({
  name: Joi.string().min(1).max(12),
  email: Joi.string().email().min(5).max(30),
  phone: Joi.string().min(5).max(20),
})
  .or("name", "email", "phone")
  .required();

const addContactSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "name field is required",
    "string.base": "name must be a string",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "email field is required",
    "string.base": "email must be a string",
    "string.email": "email must be a valid email address",
  }),
  phone: Joi.string().required().messages({
    "any.required": "phone field is required",
    "string.base": "phone must be a string",
  }),
}).required();

module.exports = { updateContactSchema, addContactSchema };
