const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const auth = require('../middleware/auth');

router.get('/', auth, restaurantController.getRestaurants);
router.post('/', auth, restaurantController.addRestaurant);

module.exports = router;
