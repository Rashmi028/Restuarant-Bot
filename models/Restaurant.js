const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    cuisine: { type: String, required: true },
    price_range: { type: String, required: true },
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
