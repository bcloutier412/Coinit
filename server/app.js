const config = require("./utils/config");
const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const userRouter = require("./controllers/users")
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connection to MongoDB:", error.message);
  });

  app.use('/api/users', userRouter);

  module.exports = app;