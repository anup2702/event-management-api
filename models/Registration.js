const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Registration", {}, { timestamps: false });
};
