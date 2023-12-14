import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

import { testIfNumber } from '../lib/testIfNumber';
import { User } from '../models/User';
import { createTokenJwt } from '../utils/jwtFunctions';

export class UserAuthController {
  private mapKey;

  constructor() {
    this.mapKey = process.env.MAP_KEY as string;
  }

  signUp = async (req: Request, res: Response) => {
    const { username, email, password, address, point } = <ISignUp>req.body;

    try {
      const [existingUserByUsername, existingUserByEmail] = await Promise.all([
        User.findFirst({
          where: { username: { equals: username, mode: 'insensitive' } },
        }),
        User.findFirst({
          where: { email: { equals: email, mode: 'insensitive' } },
        }),
      ]);

      if (existingUserByUsername)
        return res.status(409).json({ error: 'Username in use' });

      if (existingUserByEmail) return res.status(409).json({ error: 'Email in use' });

      const hash = await bcrypt.hash(password, 10);
      const newUser = {
        avatarUrl: '/assets/avatar-default-icon.png',
        username,
        email,
        password: hash,
        address,
        point,
      };

      await User.create({ data: { ...newUser } });
      return res.status(201).json({ info: 'Account created' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const userCheck = await User.findFirst({
        where: { email: { equals: email, mode: 'insensitive' } },
      });

      if (userCheck) {
        const checkPassword = await bcrypt.compare(password, userCheck.password);

        if (checkPassword) {
          const token = createTokenJwt(userCheck.id);

          return res.json({
            token,
            user: {
              id: userCheck.id,
              avatar: userCheck.avatarUrl,
              username: userCheck.username,
              email: userCheck.email,
              isAdmin: userCheck.isAdmin,
              address: userCheck.address,
              point: userCheck.point,
            },
            cartItems: userCheck.cartItems,
          });
        } else return res.status(401).json({ error: 'Invalid password' });
      } else return res.status(404).json({ error: 'Account not found' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  getAddress = async (req: Request, res: Response) => {
    const { lat, lng } = req.body;
    try {
      const request = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${this.mapKey}`,
      );

      const data = request.data;

      const address1 = data.results[0].formatted_address;
      const address2 = data.results[1].formatted_address;

      const address = testIfNumber(address2) ? address1 : address2;

      if (address) return res.json({ address });
      else return res.status(400).json({ error: 'Address not found' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
}
