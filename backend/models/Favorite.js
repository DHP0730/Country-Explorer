const mongoose = require('mongoose')

const FavoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  countryCode: { type: String, required: true },
  name: { type: String },
  flag: { type: String },
  capital: { type: String },
  region: { type: String },
  population: { type: Number },
  languages: { type: Object }
})

module.exports = mongoose.model('Favorite', FavoriteSchema)
