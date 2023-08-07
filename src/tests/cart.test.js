const request = require('supertest');
const app = require('../app');
const Product = require('../models/Product');
require("../models");

let id;
let token;

beforeAll( async () => {
    const res = await request(app).post('/users/login').send({
        email: "test@gmail.com",
        password: "12345",
    })

    token = res.body.token;
});

test('Get /carts debe traer el cart', async () => {
    const res = await request(app).get('/carts').set('Authorization', `Bearer ${token}`);;
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('Post /carts debe crear un cart', async () => {
    const product = await Product.create({
            title: "TV Samsung",
            description: "Tv que enciende",
            brand: "Samsung",
            price: "800"
    })
    const cart = {
        productId : product.id,
        quantity:1,
    }
    const res = await request(app).post('/carts').send(cart).set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    await product.destroy();
    expect(res.status).toBe(201);
    //expect(res.body.quantity).toBe(cart.quantity);
    expect(res.body.id).toBeDefined();
});

test('Put /carts/:id debe actualizar el cart', async () => {
    const cart = {
        quantity:4,   
    }
    const res = await request(app).put(`/carts/${id}`).send(cart).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    //expect(res.body.quantity).toBe(cart.quantity);
});

test('Delete /carts/:id debe eliminar el cart', async () => { 
    const res = await request(app).delete(`/carts/${id}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});