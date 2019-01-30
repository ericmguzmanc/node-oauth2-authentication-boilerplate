const UserModel = require('../models/user.model');


function registerUserInDB(username, password, registrationCallBack) {
  const query = { username: username, user_password: password };
  const update = { username: username, user_password: password };
  const options = { upsert: true, new: true, setDefaultsOnInsert: true};

  UserModel.findOneAndUpdate(query, update, options, (error, result) => {
    if (error) {
      callback(error);
      console.log('\n Error guardar token ', err)

    } else {
      callback(result);
      console.log('\n exito guardar token ', res)

    }
  });
  // const user = new UserModel({username: username, user_password: password});
  // user.save()
  //   .then(res => {
  //     if (!res.data || res.data.length === 0) {
  //       console.log('\n advertencia al registrar usuario ', res);
  //       registrationCallBack();
  //     }
  //     console.log('\n exito al registrar usuario ', res)
  //   })
  //   .catch(err => {
  //     console.log('\n Error al registrar usuario ', err)
  //   });
}

function getUserFromCredentials(username, password, callback) {
  UserModel.findOne({username: username, user_password: password})
    .then(res => {
      if (res.data || res.data.length > 0) {
        console.log('\n advertencia encontrar usuario ', res);
        callback(res)
      } else {
        return null;
      }
      console.log('\n exito encontrar usuario ', res)
    })
    .catch(err => {
      console.log('\n Error encontrar usuario ', err)
    });
}

function doesUserExist(username, callback) {
  UserModel.findOne({username: username})
    .then(res => {
      const doesUserExist = res.data !== null ? res.data.length > 0 ? true : false : null
      callback(res, doesUserExist);

      console.log('\n exito encontrar un usuario ', res)
    })
    .catch(err => {
      console.log('\n Error encontrar un usuario ', err)
    });
}

module.exports = () => {
  return {
    registerUserInDB: registerUserInDB,
    getUserFromCredentials: getUserFromCredentials,
    doesUserExist: doesUserExist
  }
}