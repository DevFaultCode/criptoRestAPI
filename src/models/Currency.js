import { Sequelize } from 'sequelize';
import db from "../db.js"

const criptomonedas = db.define(
'currency',
    {
      currency: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      value: {
        type: Sequelize.STRING
      },
    },
    {
      tableName: 'Criptomonedas'
    }
);

export default criptomonedas