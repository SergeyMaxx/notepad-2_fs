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
  timestamps: {createdAt: 'created_at'}
})

module.exports = model('Note', schema)