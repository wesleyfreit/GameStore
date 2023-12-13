import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { deleteImg } from '../lib/deleteImg';
import { uploadImg } from '../lib/uploadImg';
import { User } from '../models/User';

export class UserAccountController {
  account = async (req: Request, res: Response) => {
    try {
      const { username } = req.params;

      const user = await User.findFirst({
        where: { username: { equals: username, mode: 'insensitive' } },
        select: {
          games: {
            select: {
              game: true,
            },
            orderBy: { purchaseDate: 'desc' },
          },
        },
      });

      return res.json({ userGames: user?.games });
    } catch (error) {
      return res.sendStatus(500);
    }
  };

  edit = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const { username, email, password, address, new_password, point } = req.body;

      const [existingUserByUsername, existingUserByEmail] = await Promise.all([
        User.findFirst({
          where: { username: { equals: username, mode: 'insensitive' } },
        }),
        User.findFirst({
          where: { email: { equals: email, mode: 'insensitive' } },
        }),
      ]);

      if (existingUserByUsername && existingUserByUsername.id != id)
        return res.status(409).json({ error: 'Username in use' });

      if (existingUserByEmail && existingUserByEmail.id != id)
        return res.status(409).json({ error: 'Email in use' });

      const user = await User.findUnique({ where: { id } });

      if (user && user.id == req.id) {
        const check = await bcrypt.compare(password, user.password);

        if (check) {
          if (new_password) {
            const hash = await bcrypt.hash(new_password, 10);

            const altUser = {
              username: username.toLowerCase(),
              email: email.toLowerCase(),
              address,
              point,
              password: hash,
            };

            await User.update({ where: { id }, data: { ...altUser } });
          } else {
            const altUser = {
              username: username.toLowerCase(),
              email: email.toLowerCase(),
              address,
              point,
            };

            await User.update({ where: { id }, data: { ...altUser } });
          }

          const userUpdated = await User.findUnique({ where: { id } });

          return res.json({
            user: {
              username: userUpdated?.username,
              email: userUpdated?.email,
              address: userUpdated?.address,
              point: userUpdated?.point,
            },
          });
        } else {
          return res.status(401).json({ error: 'Password is wrong' });
        }
      } else {
        return res.status(404).json({ error: 'Validation error' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;

    const { password } = req.body;

    try {
      const user = await User.findUnique({ where: { id } });

      if (user && user.id === req.id && !user.isAdmin) {
        const check = await bcrypt.compare(password, user.password);

        if (check) {
          await User.delete({ where: { username: user.username } });

          return res.status(200).json({ info: 'Account Deleted' });
        } else return res.status(401).json({ error: 'Password is wrong' });
      } else if (user && user.isAdmin)
        return res.status(401).json({ error: `Admin's can't delete your account` });
      else return res.status(404).send('Content not found');
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  changeAvatar = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const user = await User.findUnique({ where: { id } });

      if (user) {
        const avatarUrl = (await uploadImg(req, res)) as string | undefined;

        if (!avatarUrl) return res.status(400).json({ error: 'File cannot be empty' });

        if (avatarUrl === 'error')
          return res.status(400).json({ error: 'Invalid file format' });

        await User.update({ where: { id }, data: { avatarUrl } });

        if (!user.avatarUrl.includes('avatar-default-icon'))
          await deleteImg(user.avatarUrl);

        return res.json({ avatarUrl: avatarUrl });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
}
