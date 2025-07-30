const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Event = sequelize.define("Event", {
    title: DataTypes.STRING,
    datetime: DataTypes.DATE,
    location: DataTypes.STRING,
    capacity: {
      type: DataTypes.INTEGER,
      validate: { max: 1000, min: 1 },
    },
  });
  return Event;
};
