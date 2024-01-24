const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const contactsRouter = require("./routes/api/contacts");
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/errorHandlers");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://nhnsergfr:HGHfrag176@nhnserg.jnnivf6.mongodb.net/db-contacts/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("Connection error:", err);
  process.exit(1);
});

db.once("open", () => {
  console.log("Database connection successful");
});

app.use("/api/contacts", contactsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
