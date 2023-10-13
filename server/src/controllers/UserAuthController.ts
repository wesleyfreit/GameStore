import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { User } from '../models/User';

export class UserAuthController {
  private secret;
  private mapKey;

  constructor() {
    this.secret = process.env.JWT_SECRET as string;
    this.mapKey = process.env.MAP_KEY as string;
  }

  signUp = async (req: Request, res: Response) => {
    const { username, email, password, address } = req.body;

    try {
      const check = await Promise.all([
        User.findFirst({ where: { username: { equals: username, mode: 'insensitive' } } }),
        User.findFirst({ where: { email: { equals: email, mode: 'insensitive' } } }),
      ]);

      const usernameCheck = check[0];
      const emailCheck = check[1];

      if (usernameCheck && usernameCheck.username === username && req.id !== usernameCheck.id)
        return res.status(409).json({ error: 'Username in use' });

      if (emailCheck && emailCheck.email === email && req.id !== emailCheck.id)
        return res.status(409).json({ error: 'Email in use' });

      const hash = await bcrypt.hash(password, 10);
      const newUser = {
        avatarUrl: '/assets/avatar-default-icon.png',
        username,
        email,
        password: hash,
        address,
      };
      await User.create({ data: { ...newUser } });
      return res.status(201).json({ info: 'Account created' });
    } catch (error) {
      return res.sendStatus(500);
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
          const token = jwt.sign({ id: userCheck.id, username: userCheck.username }, this.secret, {
            expiresIn: 3600,
          });

          return res.json({ token, id: userCheck.id, username: userCheck.username });
        } else return res.status(401).json({ error: 'Invalid password' });
      } else return res.status(404).json({ error: 'Account not found' });
    } catch (error) {
      return res.sendStatus(500);
    }
  };

  getAddress = async (req: Request, res: Response) => {
    const { lat, lng } = req.body;
    try {
      const request = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${this.mapKey}`,
      );
      const data = request.data;

      //OBS: checar o array de várias latlng diferentes
      console.log(data);

      const address = data.results[1].formatted_address;
      if (address) return res.json({ address });
      else return res.json({ error: 'Address not found' });
    } catch (error) {
      return res.sendStatus(500);
    }
  };
}
