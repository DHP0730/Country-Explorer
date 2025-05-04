const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/',verifyToken, favoriteController.addFavorite);       
router.get('/',verifyToken, favoriteController.getFavorites);       
router.delete('/:countryCode',verifyToken, favoriteController.removeFavorite); 

module.exports = router;