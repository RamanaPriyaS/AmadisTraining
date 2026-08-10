const {Sequelize} = require('sequelize');

const sequelize=new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    String(process.env.DB_PASSWORD),
    {
        host:process.env.HOST || 'localhost',
        port:Number(process.env.DB_PORT),
        dialect:'postgres',
        logging:console.log,
    }
);

module.exports=sequelize;