const mongoose = require('mongoose');
const ItemSchema = new mongoose.Schema({
  text: String,
  behavior: { type: mongoose.Schema.Types.ObjectId, ref: 'Behavior' }
});
module.exports = mongoose.model('Item', ItemSchema);