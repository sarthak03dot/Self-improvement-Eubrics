const mongoose = require('mongoose');
const BehaviorSchema = new mongoose.Schema({
  title: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
module.exports = mongoose.model('Behavior', BehaviorSchema);