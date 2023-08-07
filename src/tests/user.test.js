const request = require('supertest');
const app = require('../app');
require("../models");

let id;
let token;

test('Post /users debe crear un usuario', async () => {
    const user = {
        firstName:"Jesus",
        lastName:"Rodriguez",
        email: "jesus@gmail.com",
        password: "12345",
        phone:"80956565"
    }
    const res = await request(app).post('/users').send(user);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(user.name);
    expect(res.body.id).toBeDefined();
    expect(res.body.password).not.toBe(user.password)
});

test('Post /users/login debe loguear un usuario', async () => {
    const user = {
        email: "jesus@gmail.com",
        password: "12345"
    }
    const res = await request(app).post('/users/login').send(user);
    token = res.body.token;
    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
});

test('Get /users debe traer todos los usuarios', async () => {
    const res = await request(app).get('/users')
                                  .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('GetOne /users/:id debe traer un usuario por el id', async () => {
    const res = await request(app).get(`/users/${id}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
});

test('Put /users/:id debe actualizar un usuario', async () => {
    const user = {
        firstName:"Enmanuel",   
    }
    const res = await request(app).put(`/users/${id}`).send(user).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(user.name);
});

test('Delete /users/:id debe eliminar un usuario', async () => { 
    const res = await request(app).delete(`/users/${id}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});