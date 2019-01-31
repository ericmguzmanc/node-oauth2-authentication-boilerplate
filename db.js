const mongoose = require('mongoose');

const SERVER = process.env.SERVER;
const DBPORT = process.env.DBPORT;
const DATABASE = process.env.DATABASE;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const dbURI = `mongodb://${SERVER}:${DBPORT}/${DATABASE}`;
/**
 *  🔋 Database connection
 */
mongoose.connect(dbURI);

/**
 * 🏆 When successfully connected
 */
mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open to ' + dbURI);
});

/**
 * ⚠ If the connection throws an error
 */
mongoose.connection.on('error', (err) => {
  console.log(dbURI)
  console.log('Mongoose default connection error: ', err);
});

/**
 * 👋🏻 If the connection is disconnected
 */
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});
