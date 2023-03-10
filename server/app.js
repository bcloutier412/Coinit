const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const coinRouter = require("./controllers/coins");
const userRouter = require("./controllers/user")
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

logger.info("connecting to", config.MONGODB_URI);

// Connecting to database
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connection to MongoDB:", error.message);
  });

// Middleware before request hits routes
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger)

// Routes
app.use("/api/coin", coinRouter);
app.use("/api/user", userRouter);

module.exports = app;
