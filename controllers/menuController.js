const Menu = require('../models/Menu');

exports.getMenus = async (req, res, next) => {
    try {
        const menus = await Menu.find({ restaurant: req.params.restaurantId });
        res.status(200).send(menus);
    } catch (error) {
        next(error);
    }
};

exports.addMenu = async (req, res, next) => {
    const { name, description, price, image } = req.body;
    try {
        const menu = new Menu({
            restaurant: req.params.restaurantId,
            name,
            description,
            price,
            image
        });
        await menu.save();
        res.status(201).send('Menu item added');
    } catch (error) {
        next(error);
    }
};
