const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const dbconn = require('./db');
const cors = require('cors');

/**
 *  dotenv - loads environment variables from .env file into process.env
 *  Create a .env file if you need to.
 */
require('dotenv').config();

// CORS Enabled
app.use(cors());

// ℹ Routes import will be here

// ---

/**
 *  🤝🏻 Takes any incoming json string and 
 *  creates attribute called body
 */
app.use(bodyParser.json());

// 🔗 Log
app.use((req, res, next) => {
  console.log(`\x1b[36m%s\x1b[0m${new Date().toString()} => ${req.originalUrl}`, req.body);
  next();
});

// 🧵 Routes


// ---

app.use(express.static('public'));

// ⚠ 404 handler
app.use((req, res, next) => {
  res.status(404).send('404 Not Found :[ ');
});

// ⚠ 500 handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.sendFile(path.join(__dirname, '../public/500.html'))
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log('\x1b[33m%s\x1b[0m', `Server has started on port ${PORT}`));