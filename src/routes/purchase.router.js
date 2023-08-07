const { getAll, create, getOne, remove, update } = require('../controllers/purchase.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const purchaseRouter = express.Router();

purchaseRouter.route('/')
    .get(verifyJWT, getAll)
    .post(verifyJWT, create);

purchaseRouter.route('/:id')
    .get(verifyJWT, getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = purchaseRouter;