const sequelize = require('../utils/connection');
const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

const main = async() => {
    try{
        // Acciones a ejecutar antes de los tests
        sequelize.sync();

        const user = {
            firstName:"Jesus",
            lastName:"Rodriguez",
            email: "test@gmail.com",
            password: "12345",
            phone:"80956565"
        }
        const userFounf = await User.findOne({where:{email: user.email}})
        if(!userFounf) await request(app).post('/users').send(user);
        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();