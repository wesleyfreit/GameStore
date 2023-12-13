import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcrypt';
import { User } from '../models/User';

(async () => {
  const USER = process.env.USER as string;
  const EMAIL = process.env.EMAIL as string;
  const PASSWORD = process.env.PASSWORD as string;
  const ADDRESS = process.env.LNG as string;
  const LAT = process.env.LNG as string;
  const LNG = process.env.LNG as string;

  try {
    const user = await User.findFirst({
      where: {
        OR: [
          {
            username: {
              equals: USER,
              mode: 'insensitive',
            },
          },
          {
            email: {
              equals: EMAIL,
              mode: 'insensitive',
            },
          },
        ],
      },
    });

    if (user) console.log('A conta administrador já foi cadastrada.');
    else {
      const hash = await bcrypt.hash(PASSWORD, 10);

      const newUser = {
        avatarUrl: '/assets/avatar-default-icon.png',
        username: USER,
        email: EMAIL,
        password: hash,
        address: ADDRESS,
        point: [LAT, LNG],
        isAdmin: true,
      };

      await User.create({ data: { ...newUser } });

      console.log('A conta administrador foi criada com sucesso.');
    }
  } catch (error) {
    console.log(error);
  }
})();
