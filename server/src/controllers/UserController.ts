import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import UserGames from '../models/UserGames';

class UserController {
  private secret;

  constructor() {
    this.secret = process.env.JWT_SECRET as string;
  }

  signout = (req: Request, res: Response) => {
    res.clearCookie('authorization');
    res.status(200).send('Deslogado.');
  };

  create = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    try {
      const usernameCheck = await User.findFirst({
        where: { username: { equals: username, mode: 'insensitive' } },
      });
      if (usernameCheck && usernameCheck.username === username && req.id !== usernameCheck.id)
        return res.status(409).json({ error: 'Este usuário já foi cadastrado anteriormente.' });

      const emailCheck = await User.findFirst({
        where: { email: { equals: email, mode: 'insensitive' } },
      });
      if (emailCheck && emailCheck.email === email && req.id !== emailCheck.id)
        return res.status(409).json({ error: 'Este email já foi cadastrado anteriormente.' });

      const hash = await bcrypt.hash(password, 10);
      const newUser = { username, email, password: hash, isAdmin: false };
      await User.create({ data: { ...newUser } });
      return res.status(201).json({ info: 'Conta criada com sucesso.' });
    } catch (error) {
      return res.sendStatus(500);
    }
  };

  login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
      if (username) {
        const user = await User.findFirst({
          where: { username: { equals: username, mode: 'insensitive' } },
        });
        if (user) {
          const check = await bcrypt.compare(password, user.password);
          if (check) {
            const token = jwt.sign({ id: user.id, username: user.username }, this.secret, {
              expiresIn: 3600,
            });
            return res.status(200).json({ token, id: user.id, username: user.username });
          } else {
            return res.status(401).json({ error: 'Senha inválida.' });
          }
        } else {
          return res.status(404).json({ error: 'A conta que está tentando acessar não existe.' });
        }
      }
    } catch (error) {
      return res.sendStatus(500);
    }
  };

  account = async (req: Request, res: Response) => {
    try {
      const { username } = req.params;
      if (username === req.username) {
        const user = await User.findFirst({
          where: { username: { equals: username, mode: 'insensitive' } },
        });
        const userGames = await UserGames.findMany({
          where: { userId: user?.id },
          include: { game: true },
        });
        res.status(200).json({ userGames });
      } else {
        return res.status(404).send('Content not found');
      }
    } catch (error) {
      return res.sendStatus(500);
    }
  };

  read = async (req: Request, res: Response) => {
    try {
      const array = await User.findMany();
      const users = array.map((user) => {
        const object = { id: user.id, username: user.username, isAdmin: user.isAdmin };
        return object;
      });
      return res.status(200).json({ users });
    } catch (error) {
      return res.sendStatus(500);
    }
  };

  alter = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await User.findUnique({ where: { id } });
      if (user) {
        if (user.id != req.id) {
          user.isAdmin
            ? await User.update({ where: { id: user.id }, data: { isAdmin: false } })
            : await User.update({ where: { id: user.id }, data: { isAdmin: true } });
          return res.status(204).json({
            info: `Permissão alterada com sucesso, ${user.username} ${
              user.isAdmin ? 'agora é um admin' : 'não é mais um admin'
            }.`,
          });
        } else {
          return res.status(401).json({
            error: 'Você não pode e não deve alterar a própria permissão, a operação foi abortada.',
          });
        }
      } else {
        return res
          .status(404)
          .json({ error: 'O usuário que você está tentando alterar não existe.' });
      }
    } catch (error) {
      return res.sendStatus(500);
    }
  };

  edit = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { username, email, password, oldPassword } = req.body;
      const usernameCheck = await User.findFirst({
        where: { username: { equals: username, mode: 'insensitive' } },
      });
      if (usernameCheck && usernameCheck.username === username && req.id !== usernameCheck.id)
        return res.status(409).json({ error: 'Este usuário já foi cadastrado anteriormente.' });

      const emailCheck = await User.findFirst({
        where: { email: { equals: email, mode: 'insensitive' } },
      });
      if (emailCheck && emailCheck.email === email && req.id !== emailCheck.id)
        return res.status(409).json({ error: 'Este email já foi cadastrado anteriormente.' });

      const user = await User.findUnique({ where: { id } });
      if (user && user.id == req.id) {
        const check = await bcrypt.compare(oldPassword, user.password);
        if (check) {
          const hash = await bcrypt.hash(password, 10);
          const altUser = { username, email, password: hash };
          await User.update({ where: { username: user.username }, data: { ...altUser } });
          return res.status(204).json({ info: 'Os seus dados foram alterados com sucesso.' });
        } else {
          return res.status(401).json({ error: 'A senha antiga está errada, tente novamente.' });
        }
      } else {
        return res.status(404).send('Content not found');
      }
    } catch (error) {
      return res.sendStatus(500);
    }
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const user = await User.findUnique({ where: { id } });
      if (user && user.id == req.id && !user.isAdmin) {
        const destroy = await User.delete({ where: { username: user.username } });
        if (destroy) {
          res.clearCookie('authorization');
          return res.status(204).json({
            info: 'Sua conta foi deletada com sucesso, você não conseguirá mais entrar nela.',
          });
        } else {
          return res.status(401).json({
            error:
              'Ocorreu um erro ao validar os dados, verifique se estão corretos e tente novamente.',
          });
        }
      } else if (user && user.isAdmin) {
        return res.status(401).json({
          error: 'Você não pode apagar sua conta pois você é um admin, a operação foi abortada.',
        });
      } else {
        return res.status(404).send('Content not found');
      }
    } catch (error) {
      return res.sendStatus(500);
    }
  };
}

export default UserController;
