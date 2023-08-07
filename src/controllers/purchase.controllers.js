const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Image = require('../models/Image');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

const getAll = catchError(async(req, res) => {
    const results = await Purchase.findAll(
        {
            include:{model: Product, include:[Image]}, 
            where:{ userId: req.user.id }});
    return res.json(results);
});

// const create = catchError(async(req, res) => {
//     const producCart = await Cart.findAll({where:{ userId: req.user.id }});
//     for (let i = 0; i < producCart.length; i++) {
//         await Purchase.create({
//             productId: producCart[i].productId,
//             quantity: producCart[i].quantity,
//             userId: producCart[i].userId,
//         }); 
//     }
//     await Cart.destroy({ where: { userId: req.user.id} });
//     return res.status(201);
// });

const create = catchError(async(req, res) => {
    const productsCart = await Cart.findAll({ 
        where: { userId: req.user.id },
        attributes: ['quantity', 'userId', 'productId'],
        raw: true,
    });
    const purchases = await Purchase.bulkCreate(productsCart);
    await Cart.destroy({ where: { userId: req.user.id }});
    return res.status(201).json(purchases);
})

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Purchase.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Purchase.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Purchase.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}