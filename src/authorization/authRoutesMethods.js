
module.exports = injectedUserDBHelper => {

  userDBHelper = injectedUserDBHelper;

  return {
    registerUser: registerUser,
    login: login
  }
}

function registerUser(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  //validate request
  if (!isString(username) || !isString(password)) {
    return sendResponse(res, "Invalid Credentials", true);
  }

  userDBHelper.doesUserExist(username)
    .then(doesUserExist => {
      if (doesUserExist === false) {
        return userDBHelper.registerUserInDB(username, password);
      } else {
        return
        // throw new Error('User already exists');
      }
    })
    .then(
      sendResponse(res, "Failed to register user", error)
    )
    .catch(error => {
      sendResponse(res, "Failed to register user", error)
    });

}

function sendResponse(res, message, error) {
  res.status(error !== null ? error !== null ? 400 : 200 : 400)
    .json({
      'message':message,
      'error': error
    })
}

function isString(parameter) {
  return parameter !== null && (typeof parameter === "string" || parameter instanceof String) ? true : false;
}

function login(reqisterUserQuery, res) {

}