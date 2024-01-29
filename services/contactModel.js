const mongoose = require("mongoose");
const { notFoundHandler } = require("../middlewares/errorHandlers");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, "Set phone number for contact"],
      unique: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
contactSchema.post("save", notFoundHandler);

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
