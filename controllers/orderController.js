const Order = require('../models/Order');
const stripe = require('stripe')(process.env.sk_test_51PjTaM01kyFN01aW3H8YQiCtYFUKPmsupOiwxKYS7Em8Ov2gGz511B1FxDngcTbULhdgiz3RjBcC58BffdKvDhHS00sMnfMEPA);
const io = require('../server').io;

exports.getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user.id }).populate('items.menu');
        res.status(200).send(orders);
    } catch (error) {
        next(error);
    }
};

exports.addOrder = async (req, res, next) => {
    const { restaurantId, items, paymentMethodId } = req.body;
    try {
        const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalPrice * 100, // amount in cents
            currency: 'usd',
            payment_method: paymentMethodId,
            confirm: true
        });

        const order = new Order({
            user: req.user.id,
            restaurant: restaurantId,
            items,
            totalPrice,
            status: paymentIntent.status
        });
        await order.save();

        // Emit real-time order status
        io.emit('orderStatus', order._id, order.status);

        res.status(201).send('Order placed');
    } catch (error) {
        next(error);
    }
};
