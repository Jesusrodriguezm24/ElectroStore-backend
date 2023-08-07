const request = require('supertest');
const app = require('../app');
const Image = require('../models/Image');
require("../models");

let id;
let token;

beforeAll( async () => {
    const res = await request(app).post('/users/login').send({
        email: "test@gmail.com",
        password: "12345",
    })

    token = res.body.token;
})

test('Get /products debe traer todos los productos', async () => {
    const res = await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('Post /products debe crear un producto', async () => {
    const product = {
            title: "TV Samsung",
            description: "Tv que enciende",
            brand: "Samsung",
            price: "800"
    }
    const res = await request(app).post('/products').send(product).set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.title).toBe(product.title);
    expect(res.body.id).toBeDefined();
});

test('POST /products/:id/images debe traer las imagenes del producto', async () => {
    const image = await Image.create({
        url:"cualquier",
        publicId:"cosa"
    })
    const res = await request(app).post(`/products/${id}/images`).send([image.id]).set('Authorization', `Bearer ${token}`);
    await image.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('GetOne /products/:id debe traer un producto por el id', async () => {
    const res = await request(app).get(`/products/${id}`);
    expect(res.status).toBe(200);
});

test('Put /products/:id debe actualizar un producto', async () => {
    const product = {
        title:"Tv S",   
    }
    const res = await request(app).put(`/products/${id}`).send(product).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe(product.title);
});

test('Delete /products/:id debe eliminar un producto', async () => { 
    const res = await request(app).delete(`/products/${id}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});