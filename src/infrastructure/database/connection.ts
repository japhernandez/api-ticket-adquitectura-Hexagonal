import { Sequelize } from "sequelize";

if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_HOST) {
    throw new Error("Falta configurar alguna(s) variable(s) de entorno necesaria(s) para la conexión a la base de datos");
}

// Crear la instancia de Sequelize
const connection = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    { host: process.env.DB_HOST, dialect: 'mysql' }
);


export default connection
