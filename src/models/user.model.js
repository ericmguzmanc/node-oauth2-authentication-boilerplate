const mongoose = require('mongoose')
const {
  MongooseAutoIncrementID
} = require('mongoose-auto-increment-reworked')

// 📝 Schema definition
const UserSchema = new mongoose.Schema({
  // Properties
  username: {
    type: String
  },
  user_password: {
    type: String
  }
})

/**
 * Set the name of the shcema used by the plugin (for autoincrement)
 * Defaults to 'idCounter'
 */
// MongooseAutoIncrementID.initialise('MyCustomName')

// 🔌 Create the Plugin
const plugin = new MongooseAutoIncrementID(UserSchema, 'users', {
  field: 'id'
})

// Log for the plugin
plugin.applyPlugin()
  .then(() => {
    console.log('Auto user Increment Implemented!.')
  })
  .catch(e => {
    console.log('An Error Applying plugin. ')
  })

// ➕ Add the plugin to the model
UserSchema.plugin(MongooseAutoIncrementID.plugin, {
  modelName: 'users'
})

module.exports = mongoose.model('users', UserSchema)
