const dotEnv = require("dotenv");
dotEnv.config();

const mongoClient = require("mongodb").MongoClient;

let database; // This is the database as a whole;

// Now, let connect to the database

const initDb = (callback) => {
  // check if the database is already initialised
  if (database) {
    consolo.log("Database is already initialised");
    return callback(null, database);
  }
  mongoClient
    .connect(process.env.MONGODB_URL)
    .then((client) => {
      database = client;
      callback(null, database);
    })
    .catch((err) => {
      callback(err);
    });
};
// This function get the database.
const getDatabase = () => {
  // check if the data is initialised
  if (!database) {
    // if there is no database, throw this error
    throw Error("Database Not initialised");
  }
  // if there is database return the databse.
  return database;
};

module.exports = {
  initDb,
  getDatabase,
};
