const {Schema, model} = require('mongoose')

const schema = new Schema({
  header: String,
  newNote: String,
  date: String,
  time: String,
  favoritesStatus: Boolean,
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  id: String
}, {
  timestamps: true
})

module.exports = model('Favorite', schema)