const { DataTypes } = require("sequelize");
const db = require("../db");

const Comments = db.define("comment", {
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Comments;
