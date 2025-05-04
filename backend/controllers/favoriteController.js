const Favorite = require('../models/Favorite')

exports.addFavorite = async (req, res) => {
  try {
    const userId = req.user.id
    const {
      cca3: countryCode,
      name,
      flags,
      capital,
      region,
      population,
      languages
    } = req.body

    if (!countryCode) return res.status(400).json({ message: 'Missing country code' })

    const exists = await Favorite.findOne({ userId, countryCode })
    if (exists) return res.status(400).json({ message: 'Already in favorites' })

    const favorite = new Favorite({
      userId,
      countryCode,
      name: name?.common,
      flag: flags?.png,
      capital: capital?.[0] || 'N/A',
      region,
      population,
      languages
    })

    await favorite.save()
    res.status(201).json(favorite)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getFavorites = async (req, res) => {
  try {
    const userId = req.user.id
    const favorites = await Favorite.find({ userId })
    res.json(favorites)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.removeFavorite = async (req, res) => {
  try {
    const userId = req.user.id
    const countryCode = req.params.countryCode

    if (!countryCode) return res.status(400).json({ message: 'Country code is required' })

    await Favorite.findOneAndDelete({ userId, countryCode })
    res.json({ message: 'Favorite removed' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
