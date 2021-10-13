const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "postgres://postgres:dabaf85b147b4c3298bea3747db34c39@localhost:5432/red-badge-server"
);

module.exports = sequelize;
