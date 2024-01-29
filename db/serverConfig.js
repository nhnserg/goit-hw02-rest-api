const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const { MONGODB } = process.env;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB);
  } catch (error) {
    console.log(error);
  }
};

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("Connection error:", err);
  process.exit(1);
});

db.once("open", () => {
  console.log("Database connection successful");
});
module.exports = { connectDB };
