const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },

    token: String,
    avatarURL: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verification Token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

const registerSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  avatarURL: Joi.string(),
});

const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string().required(),
});

const verifiEmailSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid address",
    "any.required": "Missing required email field",
  }),
});
const schemasUser = {
  loginSchema,
  registerSchema,
  subscriptionSchema,
  verifiEmailSchema,
};

const User = mongoose.model("User", userSchema);

module.exports = { User, schemasUser };
