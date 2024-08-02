const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const auth = require('../middleware/auth');

router.get('/', auth, reservationController.getReservations);
router.post('/', auth, reservationController.addReservation);

module.exports = router;
