const mongoose = require('mongoose');

const SERVER = process.env.SERVER;
const DATABASE = process.env.DATABASE;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const dbURI = `mongodb://${USER}:${PASSWORD}@${SERVER}/${DATABASE}`;
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
  console.log('Mongoose default connection error: ', err);
});

/**
 * 👋🏻 If the connection is disconnected
 */
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});

