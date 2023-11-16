import { Request, Response } from 'express';
import slugify from 'slugify';

import { deleteImg } from '../lib/deleteImg';
import { uploadImg } from '../lib/uploadImg';
import { Game } from '../models/Game';

export class GameController {
  index = async (req: Request, res: Response) => {
    try {
      const games = await Game.findMany({ where: { disponibility: true } });

      return res.status(200).json({ games });
    } catch (error) {
      return res.sendStatus(500);
    }
  };

  read = async (req: Request, res: Response) => {
    try {
      const games = await Game.findMany({ include: { genre: true } });

      return res.status(200).json({ games });
    } catch (error) {
      return res.sendStatus(500);
    }
  };

  find = async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;

      const game = await Game.findFirst({
        where: {
          slug: {
            equals: slug,
            mode: 'insensitive',
          },
        },
        include: { genre: true },
      });

      if (game) {
        return res.status(200).json({ game });
      } else return res.status(404).send('Content not found');
    } catch (error) {
      return res.sendStatus(500);
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const { title, year, price, description, disponibility, genre } = <IGame>req.body;

      const game = await Game.findFirst({
        where: { title: { equals: title, mode: 'insensitive' } },
      });

      if (game) res.status(409).json({ error: 'Title already registered' });
      else {
        const imageUrl = (await uploadImg(req, res)) as string | undefined;

        if (!imageUrl) return res.sendStatus(400).json({ error: 'File cannot be empty' });
        else if (imageUrl === 'error')
          return res.sendStatus(400).json({ error: 'Invalid file format' });
        else {
          const newGame = {
            title,
            slug: slugify(title),
            year,
            price,
            imageUrl,
            description,
            disponibility: disponibility ? true : false,
            genreId: genre,
          };

          const game = await Game.create({ data: newGame });

          res.status(201).json({ gameId: game.id });
        }
      }
    } catch (error) {
      res.sendStatus(500);
    }
  };

  search = async (req: Request, res: Response) => {
    try {
      const { name, genre } = req.query;
      if (name && name != '') {
        const games = await Game.findMany({
          where: {
            title: {
              contains: `${name}`,
            },
          },
          include: { genre: true },
        });
        return res.status(200).json({
          games: genre ? games.filter((game) => game.genre.id == genre) : games,
        });
      } else {
        const games = await Game.findMany({ include: { genre: true } });
        return res.status(200).json({
          games: genre ? games.filter((game) => game.genre.id == genre) : games,
        });
      }
    } catch (error) {
      res.sendStatus(500);
    }
  };

  edit = async (req: Request, res: Response) => {
    try {
      const { title, year, price, description, disponibility, genre } = <IGame>req.body;
      const { id } = req.params;

      const nameCheck = await Game.findFirst({
        where: { title: { equals: title, mode: 'insensitive' } },
      });

      const idCheck = await Game.findUnique({ where: { id } });

      if (idCheck) {
        if (nameCheck && nameCheck.id != idCheck.id) {
          res.status(409).json({ error: 'Title already registered' });
        }

        const imageUrl = req.file
          ? ((await uploadImg(req, res)) as string | undefined)
          : idCheck.imageUrl;

        if (!imageUrl) return res.sendStatus(400).json({ error: 'File cannot be empty' });
        else if (imageUrl === 'error')
          return res.sendStatus(400).json({ error: 'Invalid file format' });
        else {
          const updateGame = {
            title,
            slug: slugify(title),
            year,
            price,
            imageUrl,
            description,
            disponibility: disponibility ? true : false,
            genreId: genre,
          };

          await Game.update({ where: { id }, data: { ...updateGame } });

          if (req.file) await deleteImg(idCheck.imageUrl);

          return res.json({ info: 'Game updated' });
        }
      } else {
        return res.status(404).json({ error: 'Game not found' });
      }
    } catch (error) {
      return res.sendStatus(500);
    }
  };

  remove = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const game = await Game.findUnique({ where: { id } });

      if (game) {
        const deletedImg = await deleteImg(game.imageUrl);

        if (deletedImg) {
          return res.sendStatus(500);
        }

        const destroy = await Game.delete({ where: { id } });

        if (destroy) {
          return res.status(204).json({ info: 'O jogo foi deletado.' });
        } else {
          return res.status(401).json({ error: 'Ocorreu um erro ao validar os dados.' });
        }
      } else {
        return res.status(404).json({ error: 'O jogo que tentou deletar não existe.' });
      }
    } catch (error) {
      return res.sendStatus(500);
    }
  };
}
