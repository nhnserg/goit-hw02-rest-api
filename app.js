const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const contactsRouter = require("./routes/api/contacts");
const userRoute = require("./routes/api/user");
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/errorHandlers");
const { connectDB } = require("./db/serverConfig");

require("dotenv").config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/contacts", contactsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

const { PORT } = process.env;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
