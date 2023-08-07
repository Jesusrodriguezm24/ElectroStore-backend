const request = require('supertest');
const app = require('../app');
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



test('Get /categories debe traer todas las categorias', async () => {
    const res = await request(app).get('/categories');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('Post /categories debe crear una categoria', async () => {
    const category = {
        name:"SmartPhones",
    }
    const res = await request(app).post('/categories').send(category).set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(category.name);
    expect(res.body.id).toBeDefined();
});

test('GetOne /categories/:id debe traer una categoria por el id', async () => {
    const res = await request(app).get(`/categories/${id}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
});

test('Put /categories/:id debe actualizar una categoria', async () => {
    const category = {
        name:"Tv",   
    }
    const res = await request(app).put(`/categories/${id}`).send(category).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(category.name);
});

test('Delete /categories/:id debe eliminar una categoria', async () => { 
    const res = await request(app).delete(`/categories/${id}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});