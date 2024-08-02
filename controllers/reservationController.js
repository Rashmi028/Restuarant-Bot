const Reservation = require('../models/Reservation');

exports.getReservations = async (req, res, next) => {
    try {
        const reservations = await Reservation.find({ user: req.user.id });
        res.status(200).send(reservations);
    } catch (error) {
        next(error);
    }
};

exports.addReservation = async (req, res, next) => {
    const { restaurantId, date, time, guests, specialRequests } = req.body;
    try {
        const reservation = new Reservation({
            user: req.user.id,
            restaurant: restaurantId,
            date,
            time,
            guests,
            specialRequests
        });
        await reservation.save();
        res.status(201).send('Reservation made');
    } catch (error) {
        next(error);
    }
};
