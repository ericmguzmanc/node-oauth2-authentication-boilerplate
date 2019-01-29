const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');

// 📝 Schema definition
const MySchema = new mongoose.Schema({
  // Properties
  // someField: {
  //   type: String
  // }
}); 

/**
 * Set the name of the shcema used by the plugin (for autoincrement)
 * Defaults to 'idCounter'
 */
// MongooseAutoIncrementID.initialise('MyCustomName');

// 🔌 Create the Plugin
const plugin = new MongooseAutoIncrementID(MySchema, 'ModelName');

// Log for the plugin
plugin.applyPlugin()
  .then(() => {
    console.log('Auto Increment Implemented!.');
  })
  .catch(e => {
    console.log('An Error Applying plugin. ');
  });

  // ➕ Add the plugin to the model
  MySchema.plugin(MongooseAutoIncrementID.plugin, {modelName: 'ModelName'});

  module.exports = mongoose.model('ModelName', MySchema);