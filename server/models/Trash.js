const {Schema, model} = require('mongoose')

const schema = new Schema({
  newNote: String,
  header: String,
  date: String,
  time: String,
  favoritesStatus: Boolean,
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  id: String
}, {
  timestamps: {deletedAt: 'deleted-at'}
})

module.exports = model('Trash', schema)