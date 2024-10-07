import { Sequelize } from 'sequelize';

const db = new Sequelize('criptobro', 'postgres', 'QWERTY1101', {
    host: 'localhost',
    dialect:'postgres'
  });

export default db