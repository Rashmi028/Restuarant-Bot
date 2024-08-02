const express = require('express');
const router = express.Router();
const {getRestaurants, addRestaurant } = require('../controllers/restaurantController');
const auth = require('../middleware/auth');

// Example route definitions
router.get('/restaurants', getRestaurants);  // Correct: `getRestaurants` should be a function
router.post('/restaurants', addRestaurant);

module.exports = router;
