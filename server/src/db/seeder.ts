import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcrypt';
import User from '../models/User';

(async () => {
  const USER = process.env.USER as string;
  const EMAIL = process.env.EMAIL as string;
  const PASSWORD = process.env.PASSWORD as string;
  try {
    const user = await User.findFirst({
      where: {
        OR: [
          {
            username: {
              endsWith: USER,
              mode: 'insensitive',
            },
          },
          {
            email: {
              endsWith: EMAIL,
              mode: 'insensitive',
            },
          },
        ],
      },
    });
    if (user) {
      console.log('A conta administrador já foi cadastrada.');
    } else {
      const hash = await bcrypt.hash(PASSWORD, 10);
      const newUser = { username: USER, email: EMAIL, password: hash, isAdmin: true };
      await User.create({ data: { ...newUser } });
      console.log('A conta administrador foi criada com sucesso.');
    }
  } catch (error) {
    console.log(error);
  }
})();
