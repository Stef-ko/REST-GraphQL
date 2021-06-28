const dbConfig = require("./config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.url = dbConfig.MONGODB;

module.exports = db;
