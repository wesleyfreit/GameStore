import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import User from '../models/User';

(async () => {
  const { USER, PASSWORD, EMAIL } = process.env;
  try {
    const user = await User.findOne({ where: { [Op.or]: [{ username: USER }, { email: EMAIL }] } });
    if (user) {
      console.log('A conta administrador já foi cadastrada.');
    } else {
      const hash = await bcrypt.hash(PASSWORD as string, 10);
      const newUser = { username: USER, email: EMAIL, password: hash, isAdmin: true };
      await User.create(newUser);
      console.log('A conta administrador foi criada com sucesso.');
    }
  } catch (error) {
    console.log(error);
  }
})();
