const express = require("express");
require("dotenv").config();
const { sequelize } = require("./models");
const eventRoutes = require("./routes/eventRoutes");
const errorHandler = require("./middleware/errorHandler");
const userRoutes = require("./routes/userRoutes");


const app = express();
app.use(express.json());

app.use("/events", eventRoutes);
app.use("/users", userRoutes);

app.use(errorHandler);

module.exports = app;
