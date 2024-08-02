const Restaurant = require('../models/Restaurant');

exports.getRestaurants = async (req, res, next) => {
    try {
        const restaurants = await Restaurant.find();
        res.status(200).send(restaurants);
    } catch (error) {
        next(error);
    }
};

exports.addRestaurant = async (req, res, next) => {
    const { name, location, cuisine, price_range } = req.body;
    try {
        const restaurant = new Restaurant({ name, location, cuisine, price_range });
        await restaurant.save();
        res.status(201).send('Restaurant added');
    } catch (error) {
        next(error);
    }
};
