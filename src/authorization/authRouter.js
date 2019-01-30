// const express = require('express');
// const router = express.Router();



module.exports = (router, app, authRoutesMethods) => {
  router.post('/registerUser', () => authRoutesMethods.registerUser);
  router.post('/login', app.oauth.grant());

  return router;
};