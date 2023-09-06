import { DataTypes } from 'sequelize';
import database from '../db/database';

const Genre = database.define('genres', {
  name: {
    type: DataTypes.STRING,
    unique: true,
  },
});

export default Genre;
