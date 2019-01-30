const AccessTokensModel = require('../models/access-tokens.model');


function saveAccessToken(acccessToken, userID, callback) {
  // const token = new AccessTokensModel({access_token: acccessToken, user_id: userID});
  const query = {access_token: access_token, user_id: userID};
  const update = { access_token: acccessToken, user_id: userID };
  const options = { upsert: true, new: true, setDefaultsOnInsert: true};

  AccessTokensModel.findOneAndUpdate(query, update, options, (error, result) => {
    if (error) {
      callback(error);
      console.log('\n Error guardar token ', err)

    } else {
      callback(result);
      console.log('\n exito guardar token ', res)

    }
  });

  // token.save()
  //   .then(res => {
  //     callback(res);
  //     console.log('\n exito guardar token ', res)
  //   })
  //   .catch(err => {
  //     console.log('\n Error guardar token ', err)
  //   });
}


function getUserIDFromBearerToken(bearerToken, callback) {
  AccessTokensModel.findOne({access_token: bearerToken})
    .then(res => {
      const userID = res !== null && res.data.length == 1 ? res.data.user_id : null;
      callback(res);
      console.log('\n exito encontrar un token ', res)
    })
    .catch(err => {
      console.log('\n Error encontrar un token ', err)
    })
}

module.exports = () => {
  return {
    saveAccessToken: saveAccessToken,
    getUserIDFromBearerToken: getUserIDFromBearerToken
  }
}