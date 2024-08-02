const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const auth = require('../middleware/auth');

router.get('/:restaurantId', auth, menuController.getMenus);
router.post('/:restaurantId', auth, menuController.addMenu);

module.exports = router;
