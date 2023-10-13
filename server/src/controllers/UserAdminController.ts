import { Request, Response } from 'express';
import { User } from '../models/User';

export class UserAdminController {
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
}
