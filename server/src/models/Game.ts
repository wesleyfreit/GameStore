import { DataTypes } from 'sequelize';
import database from '../db/database';
import Genre from './Genre';

const Game = database.define('games', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  disponibility: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

Game.belongsTo(Genre);
Genre.hasMany(Game);

export default Game;
