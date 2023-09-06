import dotenv from 'dotenv'
dotenv.config();

import { Dialect, Sequelize } from 'sequelize';

const url = process.env.DATABASE_URL as string;
const dialect = process.env.DATABASE_DIALECT as Dialect;
const port = process.env.DATABASE_PORT as unknown as number;

const sequelize = new Sequelize(url, {
  port: port,
  dialect: dialect,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export default sequelize;
