const { getAll, create, remove, update } = require('../controllers/image.controllers');
const express = require('express');
const upload = require('../utils/multer');
const verifyJWT = require('../utils/verifyJWT');

const imageRouter = express.Router();

imageRouter.route('/')
    .get(verifyJWT, getAll)
    .post(verifyJWT, upload.single('image'), create);

imageRouter.route('/:id')
    .put(verifyJWT, update)
    .delete(verifyJWT, remove);

module.exports = imageRouter;