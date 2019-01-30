const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');

// 📝 Schema definition
const AccessTokensSchema = new mongoose.Schema({
  // Properties
  access_token: {
    type: String
  },
  user_id: {
    type: String
  }
}); 

/**
 * Set the name of the shcema used by the plugin (for autoincrement)
 * Defaults to 'idCounter'
 */
// MongooseAutoIncrementID.initialise('MyCustomName');

// 🔌 Create the Plugin
const plugin = new MongooseAutoIncrementID(AccessTokensSchema, 'access_tokens', { field:'id' });

// Log for the plugin
plugin.applyPlugin()
  .then(() => {
    console.log('Auto access tokens Increment Implemented!.');
  })
  .catch(e => {
    console.log('An Error Applying plugin. ');
  });

  // ➕ Add the plugin to the model
  AccessTokensSchema.plugin(MongooseAutoIncrementID.plugin, {modelName: 'access_tokens'});

  module.exports = mongoose.model('access_tokens', AccessTokensSchema);