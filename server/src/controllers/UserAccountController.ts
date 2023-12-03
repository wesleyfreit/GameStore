import { Request, Response } from 'express';
import { User } from '../models/User';

export class UserAccountController {
  account = async (req: Request, res: Response) => {
    try {
      const { username } = req.params;
      const user = await User.findFirst({
        where: { username: { equals: username, mode: 'insensitive' } },
        include: { games: true },
      });
      if (user) {
        res.json({ userGames: user.games });
      }
      res.status(404).json({ error: 'Usuário não encontrado.' });
    } catch (error) {
      return res.sendStatus(500);
    }
  };

  edit = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      // const avatarUrl = `${req.imgUrl}`;
      const { username, email, password, oldPassword } = req.body;
      const usernameCheck = await User.findFirst({
        where: { username: { equals: username, mode: 'insensitive' } },
      });
      if (
        usernameCheck &&
        usernameCheck.username === username &&
        req.id !== usernameCheck.id
      )
        return res
          .status(409)
          .json({ error: 'Este usuário já foi cadastrado anteriormente.' });

      const emailCheck = await User.findFirst({
        where: { email: { equals: email, mode: 'insensitive' } },
      });
      if (emailCheck && emailCheck.email === email && req.id !== emailCheck.id)
        return res
          .status(409)
          .json({ error: 'Este email já foi cadastrado anteriormente.' });

      const user = await User.findUnique({ where: { id } });
      if (user && user.id == req.id) {
        // const check = await bcrypt.compare(oldPassword, user.password);
        // if (check) {
        //   const hash = await bcrypt.hash(password, 10);
        //   const altUser = { username, email, password: hash };
        //   await User.update({ where: { username: user.username }, data: { ...altUser } });
        //   return res.status(204).json({ info: 'Os seus dados foram alterados com sucesso.' });
        // } else {
        //   return res.status(401).json({ error: 'A senha antiga está errada, tente novamente.' });
        // }
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
          error:
            'Você não pode apagar sua conta pois você é um admin, a operação foi abortada.',
        });
      } else {
        return res.status(404).send('Content not found');
      }
    } catch (error) {
      return res.sendStatus(500);
    }
  };
}
