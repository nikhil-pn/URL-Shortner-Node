const Sequelize = require("sequelize");

const createDB = new Sequelize("UrlDb", "username", "password",{
  host: "./config/db.sqlite",
  dialect : "sqlite"
})

module.exports = createDB;