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

test('Get /purchases debe traer las compras', async () => {
    const res = await request(app).get('/purchases').set('Authorization', `Bearer ${token}`);;
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});
