const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config(); //dotenv - loads environment variables from .env file into process.env
const bodyParser = require('body-parser');
const cors = require('cors');
const dbconn = require('./dbHelpers/db');
const userDBHelper = require('./dbHelpers/userDBHelper');
const authRoutesMethods = require('./authorization/authRoutesMethods');
const accessTokenDBHelper = require('./dbHelpers/bearerTokensDBHelper');
const oAuthModel = require('./authorization/accessTokenModel')(userDBHelper, accessTokenDBHelper);
const oAuth2Server = require('node-oauth2-server');

// console.log('\n\n oauthmodel ', oAuthModel, ' \n\n')
app.oauth = oAuth2Server({
  model: oAuthModel,
  grants: ['password'],
  debug: true
});

const authRouter = require('./authorization/authRouter')(express.Router(), app, authRoutesMethods);

// CORS Enabled
app.use(cors());


// ℹ Routes import will be here
app.use('/auth', authRouter);
app.use(app.oauth.errorHandler());
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


app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log('\x1b[33m%s\x1b[0m', `Server has started on port ${PORT}`));