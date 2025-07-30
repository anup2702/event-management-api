const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
});

const Event = require("./Event")(sequelize);
const User = require("./User")(sequelize);
const Registration = require("./Registration")(sequelize);

User.belongsToMany(Event, { through: Registration });
Event.belongsToMany(User, { through: Registration });

module.exports = { sequelize, Event, User, Registration };
