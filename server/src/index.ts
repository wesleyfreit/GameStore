import express from 'express';
import sequelize from './db/database';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

app.listen(port, () => {
  console.log(`Server is running in the port ${port}`);
});
