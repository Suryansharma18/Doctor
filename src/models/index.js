const fs = require("fs");
const path = require("path");
const { sequelize } = require("../config/database");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const db = {};

fs.readdirSync(__dirname)
  .filter((file) => file.endsWith(".model.js"))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    if (model && model.name) {
      db[model.name] = model;
    } else {
      console.warn(`⚠️ Skipping model file ${file} - export invalid`);
    }
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
